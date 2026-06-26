import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiSparkles } from "react-icons/hi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { createListing } from "../services/AllApi";

const PRESS_ANIMATION = "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";

const ListingSchema = Yup.object().shape({
  title: Yup.string().max(40, "Keep it punchy (Max 40 chars)").required("Title is required"),
  category: Yup.string().required("Select a category"),
  description: Yup.string().max(250, "Keep it under 250 characters").required("Description is required"),
  level: Yup.string().required("Select a proficiency level"),
  costPerHour: Yup.number().min(0, "Must be positive").max(100, "Max 100 SKL/hr").required("Cost is required")
});

export default function CreateListingModal({ isOpen, onClose, onSuccess }) {
  const [formError, setFormError] = useState("");

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setFormError("");
    try {
      await createListing(values);
      
      resetForm();
      if (onSuccess) onSuccess(); 
      onClose();
      
    } catch (err) {
      setFormError(err.response?.data?.message || "Failed to create listing. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full h-11 px-3 border-2 border-black dark:border-white bg-slate-50 dark:bg-neutral-900 rounded-lg text-xs font-bold outline-none focus:border-indigo-600 dark:focus:border-orange-400 text-black dark:text-white";
  const errorClass = "text-[10px] font-black text-rose-500 uppercase tracking-tight mt-1 absolute";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white dark:bg-[#111] border-4 border-black dark:border-white rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] flex flex-col font-mono"
          >
            
            <button onClick={onClose} className={`absolute -top-4 -right-4 w-10 h-10 bg-rose-500 text-white border-4 border-black dark:border-white rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] z-20 hover:bg-rose-600 transition-all ${PRESS_ANIMATION}`}>
              <HiX className="w-5 h-5" />
            </button>

            <div className="p-5 border-b-4 border-black dark:border-white flex items-center gap-2 bg-indigo-50 dark:bg-orange-500/10 rounded-t-xl">
              <HiSparkles className="w-6 h-6 text-indigo-600 dark:text-orange-400" />
              <h2 className="text-xl font-black uppercase tracking-tight text-black dark:text-white">Create Listing</h2>
            </div>

            <div className="p-6">
              {formError && (
                <div className="mb-6 p-3 bg-rose-500/10 border-2 border-rose-500 text-rose-500 text-xs font-black uppercase rounded-lg">
                  ⚠️ {formError}
                </div>
              )}

              <Formik
                initialValues={{ title: "", category: "tech", description: "", level: "Beginner", costPerHour: 1 }}
                validationSchema={ListingSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-6">
                    
                    <div className="space-y-1.5 relative pb-4">
                      <label className="text-[11px] font-bold uppercase text-slate-500">Skill Title</label>
                      <Field name="title" className={inputClass} placeholder="e.g., Advanced React Hooks" />
                      <ErrorMessage name="title" component="div" className={errorClass} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5 relative pb-4">
                        <label className="text-[11px] font-bold uppercase text-slate-500">Category</label>
                        <Field as="select" name="category" className={inputClass}>
                          <option value="languages">Languages</option>
                          <option value="tech">Academic & Tech</option>
                          <option value="creative">Arts & Creative</option>
                          <option value="business">Business & Growth</option>
                          <option value="misc">Misc</option>
                        </Field>
                        <ErrorMessage name="category" component="div" className={errorClass} />
                      </div>

                      <div className="space-y-1.5 relative pb-4">
                        <label className="text-[11px] font-bold uppercase text-slate-500">Mastery Level</label>
                        <Field as="select" name="level" className={inputClass}>
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </Field>
                        <ErrorMessage name="level" component="div" className={errorClass} />
                      </div>
                    </div>

                    <div className="space-y-1.5 relative pb-4">
                      <label className="text-[11px] font-bold uppercase text-slate-500">Listing Description</label>
                      <Field as="textarea" name="description" rows="3" className={`${inputClass} h-auto py-2 resize-none`} placeholder="What exactly will you teach or offer?" />
                      <ErrorMessage name="description" component="div" className={errorClass} />
                    </div>

                    <div className="space-y-1.5 relative pb-4">
                      <label className="text-[11px] font-bold uppercase text-slate-500">Exchange Cost (SKL/hr)</label>
                      <Field type="number" name="costPerHour" step="0.5" className={inputClass} />
                      <ErrorMessage name="costPerHour" component="div" className={errorClass} />
                    </div>

                    <div className="pt-2">
                      <button 
                        type="submit" disabled={isSubmitting}
                        className={`w-full h-12 bg-black text-white dark:bg-white dark:text-black font-black uppercase tracking-widest text-xs rounded-xl border-4 border-black dark:border-white transition-all ${
                          isSubmitting ? "opacity-50 cursor-not-allowed" : `shadow-[4px_4px_0px_0px_#4f46e5] dark:shadow-[4px_4px_0px_0px_#f97316] ${PRESS_ANIMATION}`
                        }`}
                      >
                        {isSubmitting ? "Publishing..." : "Publish Listing"}
                      </button>
                    </div>

                  </Form>
                )}
              </Formik>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}