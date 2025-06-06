// Password strength requirements
export const passwordRequirements = [
    { text: "At least 8 characters", regex: /.{8,}/ },
    { text: "Contains uppercase letter", regex: /[A-Z]/ },
    { text: "Contains lowercase letter", regex: /[a-z]/ },
    { text: "Contains number", regex: /[0-9]/ },
    { text: "Contains special character", regex: /[!@#$%^&*]/ },
  ]
  
  export const calculatePasswordStrength = (password, requirements) => {
    const strength = requirements.reduce((score, requirement) => {
      return score + (requirement.regex.test(password) ? 1 : 0)
    }, 0)
    return (strength / requirements.length) * 100
  }
  