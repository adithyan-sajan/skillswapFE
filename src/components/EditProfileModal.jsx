import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiUpload, HiPlus, HiTrash } from "react-icons/hi";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

// 1. IMPORT THE CENTRALIZED API CALL
import { updateProfile } from "../services/AllApi";

const PRESS_ANIMATION = "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";

const ProfileSchema = Yup.object().shape({
  bio: Yup.string().max(250, "Keep it under 250 characters!").required("Bio is required"),
  location: Yup.string().max(50, "Too long!").required("Location is required"),
  website: Yup.string().url("Must be a valid URL").nullable(),
  socials: Yup.object().shape({
    github: Yup.string().url("Must be a valid URL").nullable(),
    linkedin: Yup.string().url("Must be a valid URL").nullable(),
    twitter: Yup.string().url("Must be a valid URL").nullable(),
  })
});

// 2. ADD onSaveSuccess PROPS EXTENSION
export default function EditProfileModal({ isOpen, onClose, initialData, onSaveSuccess }) {
  const [avatarPreview, setAvatarPreview] = useState(initialData?.avatarUrl || "");
  const [formError, setFormError] = useState("");

  // 3. COMPLETE REFACTOR OF SUBMISSION SYSTEM
  const handleSubmit = async (values, { setSubmitting }) => {
    setFormError("");
    try {
      let payload;

      if (values.avatarFile) {
        // SCENARIO A: Image changed -> Generate multi-part payload structure
        payload = new FormData();
        payload.append("avatar", values.avatarFile);
        payload.append("bio", values.bio);
        payload.append("location", values.location);
        payload.append("website", values.website);
        
        // Flatten nested objects so Multer parser fields parse cleanly
        payload.append("socials[github]", values.socials.github || "");
        payload.append("socials[linkedin]", values.socials.linkedin || "");
        payload.append("socials[twitter]", values.socials.twitter || "");
        
        // Flatten text arrays
        values.skillsOffered.forEach((skill) => payload.append("skillsOffered[]", skill));
        values.skillsDesired.forEach((skill) => payload.append("skillsDesired[]", skill));
      } else {
        // SCENARIO B: No image change -> Streamline as a pure clean JSON object
        payload = {
          bio: values.bio,
          location: values.location,
          website: values.website,
          socials: values.socials,
          skillsOffered: values.skillsOffered,
          skillsDesired: values.skillsDesired
        };
      }

      // Execute the unified network patch
      await updateProfile(payload);
      
      // 4. PIPELINE ACTIONS UPON SUCCESS
      if (onSaveSuccess) onSaveSuccess(); // Triggers Profile.jsx to re-fetch straight from database
      onClose(); // Securely close the layout window
      
    } catch (err) {
      setFormError(err.response?.data?.message || "Matrix synchronization failure. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full h-10 px-3 border-2 border-black dark:border-white bg-slate-50 dark:bg-neutral-900 rounded-lg text-xs font-bold outline-none focus:border-indigo-600 dark:focus:border-orange-400 text-black dark:text-white";
  const errorClass = "text-[10px] font-black text-rose-500 uppercase tracking-tight mt-1 absolute";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999]">
          
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose} 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <div className="fixed inset-0 overflow-y-auto pointer-events-none flex justify-center items-start md:items-center p-4 pt-24 pb-10">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-3xl bg-white dark:bg-[#111] border-4 border-black dark:border-white rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] flex flex-col max-h-[80vh] pointer-events-auto text-black dark:text-white font-mono"
            >
              
              <button type="button" onClick={onClose} className={`absolute -top-4 -right-4 w-10 h-10 bg-rose-500 text-white border-4 border-black dark:border-white rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] z-20 hover:bg-rose-600 transition-all ${PRESS_ANIMATION}`}>
                <HiX className="w-5 h-5" />
              </button>

              <div className="p-5 md:p-6 border-b-4 border-black dark:border-white shrink-0">
                <h2 className="text-xl md:text-2xl font-black uppercase">Edit Identity</h2>
              </div>

              {/* Modal Body */}
              <div className="overflow-y-auto p-5 md:p-6 flex-grow custom-scrollbar">
                
                {/* DYNAMIC BACKEND RESPONSE FEEDBACK HOOK */}
                {formError && (
                  <div className="mb-6 p-3 bg-rose-500/10 border-2 border-rose-500 text-rose-500 text-xs font-black uppercase rounded-lg">
                    ⚠️ {formError}
                  </div>
                )}

                <Formik
                  initialValues={{
                    bio: initialData.bio || "",
                    location: initialData.location || "",
                    website: initialData.website || "",
                    socials: {
                      github: initialData.socials?.github || "",
                      linkedin: initialData.socials?.linkedin || "",
                      twitter: initialData.socials?.twitter || ""
                    },
                    skillsOffered: initialData.skillsOffered || [],
                    skillsDesired: initialData.skillsDesired || [],
                    avatarFile: null
                  }}
                  validationSchema={ProfileSchema}
                  onSubmit={handleSubmit}
                  enableReinitialize={true}
                >
                  {({ values, setFieldValue, isSubmitting }) => (
                    <Form className="space-y-8">
                      
                      {/* AVATAR UPLOAD */}
                      <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-xl border-4 border-black dark:border-white overflow-hidden shrink-0">
                          <img src={avatarPreview || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&h=300&q=80"} alt="Avatar Preview" className="w-full h-full object-cover bg-slate-100 dark:bg-neutral-800" />
                        </div>
                        <div>
                          <label className={`cursor-pointer px-4 py-2 bg-indigo-600 text-white dark:bg-orange-500 dark:text-black font-black uppercase text-xs rounded-lg border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] flex items-center gap-2 transition-all ${PRESS_ANIMATION}`}>
                            <HiUpload className="w-4 h-4" /> Upload Image
                            <input 
                              type="file" accept="image/*" className="hidden"
                              onChange={(e) => {
                                const file = e.currentTarget.files[0];
                                if (file) {
                                  setFieldValue("avatarFile", file);
                                  setAvatarPreview(URL.createObjectURL(file));
                                }
                              }}
                            />
                          </label>
                          <p className="text-[10px] font-bold text-black/50 dark:text-white/50 mt-2 uppercase tracking-wide">JPG, PNG, WEBP. Max 2MB.</p>
                        </div>
                      </div>

                      {/* BASIC INFO */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5 relative pb-4">
                          <label className="text-[11px] font-bold uppercase text-slate-500">Location</label>
                          <Field name="location" className={inputClass} placeholder="City, Country" />
                          <ErrorMessage name="location" component="div" className={errorClass} />
                        </div>
                        <div className="space-y-1.5 relative pb-4">
                          <label className="text-[11px] font-bold uppercase text-slate-500">Personal Website</label>
                          <Field name="website" className={inputClass} placeholder="https://..." />
                          <ErrorMessage name="website" component="div" className={errorClass} />
                        </div>
                      </div>

                      <div className="space-y-1.5 relative pb-4">
                        <label className="text-[11px] font-bold uppercase text-slate-500">Bio</label>
                        <Field as="textarea" name="bio" rows="3" className={`${inputClass} h-auto py-2 resize-none`} placeholder="Tell the network about yourself..." />
                        <ErrorMessage name="bio" component="div" className={errorClass} />
                      </div>

                      {/* SOCIAL LINKS */}
                      <div className="space-y-4 p-4 border-4 border-black dark:border-white rounded-xl bg-slate-50 dark:bg-neutral-900/50">
                        <h3 className="text-sm font-black uppercase tracking-widest border-b-2 border-black/10 dark:border-white/10 pb-2">Social Links</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-1.5 relative pb-4">
                            <label className="text-[10px] font-bold uppercase text-slate-500">GitHub</label>
                            <Field name="socials.github" className={inputClass} placeholder="URL" />
                            <ErrorMessage name="socials.github" component="div" className={errorClass} />
                          </div>
                          <div className="space-y-1.5 relative pb-4">
                            <label className="text-[10px] font-bold uppercase text-slate-500">LinkedIn</label>
                            <Field name="socials.linkedin" className={inputClass} placeholder="URL" />
                            <ErrorMessage name="socials.linkedin" component="div" className={errorClass} />
                          </div>
                          <div className="space-y-1.5 relative pb-4">
                            <label className="text-[10px] font-bold uppercase text-slate-500">Twitter/X</label>
                            <Field name="socials.twitter" className={inputClass} placeholder="URL" />
                            <ErrorMessage name="socials.twitter" component="div" className={errorClass} />
                          </div>
                        </div>
                      </div>

                      {/* DYNAMIC SKILL ARRAYS */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h3 className="text-sm font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Skills I Offer</h3>
                          <FieldArray name="skillsOffered">
                            {({ push, remove }) => (
                              <div className="space-y-2">
                                {values.skillsOffered.map((skill, index) => (
                                  <div key={index} className="flex gap-2">
                                    <Field name={`skillsOffered.${index}`} className={inputClass} />
                                    <button type="button" onClick={() => remove(index)} className="w-10 h-10 shrink-0 flex items-center justify-center bg-rose-100 text-rose-600 border-2 border-black dark:border-white rounded-lg hover:bg-rose-500 hover:text-white transition-colors">
                                      <HiTrash className="w-4 h-4" />
                                    </button>
                                  </div>
                                ))}
                                <button type="button" onClick={() => push("")} className="text-[10px] font-black uppercase flex items-center gap-1 text-slate-500 hover:text-black dark:hover:text-white transition-colors mt-2">
                                  <HiPlus /> Add Skill
                                </button>
                              </div>
                            )}
                          </FieldArray>
                        </div>

                        <div className="space-y-3">
                          <h3 className="text-sm font-black uppercase tracking-widest text-sky-600 dark:text-sky-400">Skills I Want</h3>
                          <FieldArray name="skillsDesired">
                            {({ push, remove }) => (
                              <div className="space-y-2">
                                {values.skillsDesired.map((skill, index) => (
                                  <div key={index} className="flex gap-2">
                                    <Field name={`skillsDesired.${index}`} className={inputClass} />
                                    <button type="button" onClick={() => remove(index)} className="w-10 h-10 shrink-0 flex items-center justify-center bg-rose-100 text-rose-600 border-2 border-black dark:border-white rounded-lg hover:bg-rose-500 hover:text-white transition-colors">
                                      <HiTrash className="w-4 h-4" />
                                    </button>
                                  </div>
                                ))}
                                <button type="button" onClick={() => push("")} className="text-[10px] font-black uppercase flex items-center gap-1 text-slate-500 hover:text-black dark:hover:text-white transition-colors mt-2">
                                  <HiPlus /> Add Skill
                                </button>
                              </div>
                            )}
                          </FieldArray>
                        </div>
                      </div>

                      {/* SUBMIT BUTTON */}
                      <div className="pt-6 border-t-4 border-black dark:border-white flex justify-end">
                        <button 
                          type="submit" disabled={isSubmitting}
                          className={`px-8 h-12 bg-black text-white dark:bg-white dark:text-black font-black uppercase text-sm rounded-xl border-4 border-black dark:border-white transition-all ${
                            isSubmitting ? "opacity-50 cursor-not-allowed" : `shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] ${PRESS_ANIMATION}`
                          }`}
                        >
                          {isSubmitting ? "Saving Matrix..." : "Save Identity"}
                        </button>
                      </div>

                    </Form>
                  )}
                </Formik>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}