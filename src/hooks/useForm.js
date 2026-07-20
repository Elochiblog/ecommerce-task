import { useState, useCallback } from "react";

export function useForm(initialValues, validationRules = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  }, []);

  const setFieldValue = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const validate = useCallback(() => {
    const nextErrors = {};
    for (const field of Object.keys(validationRules)) {
      const rule = validationRules[field];
      const message = rule(values[field], values);
      if (message) nextErrors[field] = message;
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [validationRules, values]);

  const handleSubmit = useCallback(
    (onValid) => async (e) => {
      if (e?.preventDefault) e.preventDefault();
      setSubmitError(null);
      if (!validate()) return;
      setSubmitting(true);
      try {
        await onValid(values);
      } finally {
        setSubmitting(false);
      }
    },
    [validate, values]
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setSubmitError(null);
  }, []);

  return {
    values,
    errors,
    submitting,
    submitError,
    setSubmitError,
    handleChange,
    setFieldValue,
    validate,
    handleSubmit,
    reset,
  };
}

export const rules = {
  required: (label) => (value) =>
    !value || !String(value).trim() ? `${label} is required` : undefined,

  email: () => (value) => {
    if (!value) return undefined;
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    return ok ? undefined : "Enter a valid email address";
  },

  minLength: (label, min) => (value) => {
    if (!value) return undefined;
    return value.length < min
      ? `${label} must be at least ${min} characters`
      : undefined;
  },

  password: () => (value) => {
    if (!value) return undefined;
    if (value.length < 6) return "Password must be at least 6 characters";
    return undefined;
  },

  matchesField: (label, otherFieldName) => (value, allValues) => {
    if (!value) return undefined;
    return value !== allValues[otherFieldName]
      ? `${label} does not match`
      : undefined;
  },

  compose:
    (...validators) =>
    (value, allValues) => {
      for (const v of validators) {
        const msg = v(value, allValues);
        if (msg) return msg;
      }
      return undefined;
    },
};
