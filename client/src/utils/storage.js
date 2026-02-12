const STORAGE_KEYS = {
    USER_PROFILE: 'learniq_user_profile',
    COURSE_PROGRESS: 'learniq_course_progress',
    ACHIEVEMENTS: 'learniq_achievements',
    SETTINGS: 'learniq_settings'
};

export const getStoredProfile = (defaultUser) => {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
        return stored ? JSON.parse(stored) : defaultUser;
    } catch (e) {
        console.error("Error reading profile from storage", e);
        return defaultUser;
    }
};

export const saveStoredProfile = (profile) => {
    try {
        localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
        // Dispatch event for other components to listen if needed
        window.dispatchEvent(new Event('storage'));
        return true;
    } catch (e) {
        console.error("Error saving profile to storage", e);
        return false;
    }
};

export const getProgress = () => {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.COURSE_PROGRESS)) || {};
    } catch {
        return {};
    }
};

export const saveProgress = (courseId, progress) => {
    const current = getProgress();
    current[courseId] = progress;
    localStorage.setItem(STORAGE_KEYS.COURSE_PROGRESS, JSON.stringify(current));
};

export default {
    getStoredProfile,
    saveStoredProfile,
    getProgress,
    saveProgress
};
