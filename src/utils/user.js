/**
 * Get current authenticated user
 * 
 * @returns string | null
 */
export const getCurrentUser = () => {
  return localStorage.getItem('currentUser') || null;
};

/**
 * Set current authenticated user
 * 
 * @param {*} username 
 * @returns void
 */
export const setCurrentUser = (username) => {
  localStorage.setItem('currentUser', username);
};

/**
 * Logs all user out
 */
export const logout = () => {
  localStorage.removeItem('currentUser');
};

/**
 * Get complete user data by username
 * 
 * @returns Object | null
 */
export const getUserData = (username = null) => {
  const user = username || getCurrentUser();
  return user ? JSON.parse(localStorage.getItem(user)) : null;
};

/**
 * Sets user data by username
 * 
 * @param {*} username 
 * @param {*} data 
 * @returns void
 */
export const setUserData = (username, data) => {
  localStorage.setItem(username, JSON.stringify(data));
};

/**
 * Get user profile by username
 * 
 * @param {*} username 
 * @returns Object | null
 */
export const getUserProfile = (username = null) => {
  return username ? getUserData(username)?.profile : getUserData()?.profile;
};

/**
 * Get user status
 * 
 * @returns Object | null
 */
export const getUserStatus = () => {
  return getUserData()?.status || null;
};

/**
 * Get user profile
 * 
 * @returns Object | null
 */
export const getUserProgress = () => {
  return getUserData()?.progress || null;
};

/**
 * Get user daily quests
 * 
 * @returns Object | null
 */
export const getUserDailyQuests = () => {
  return getUserData()?.daily_quests || null;
};

/**
 * Get user daily quests by date input
 * 
 * @param {*} date 
 * @returns Object | null
 */
export const getUserDailyQuestsByDate = (date) => {
  const dailyQuests = getUserData()?.daily_quests || null;
  if (!dailyQuests || !dailyQuests[date]) return null;
  return dailyQuests[date];
};

/**
 * Updates user daily quest
 * 
 * @param {*} date 
 * @param {*} index 
 * @param {*} data 
 * @returns void
 */
export const updateUserDailyQuest = (date, index, data) => {
  const dailyQuests = getUserDailyQuestsByDate(date);
  dailyQuests[index] = { ...dailyQuests[index], ...data };

  updateUserData('daily_quests', { [date]: dailyQuests });
};

/**
 * Helper function to update user (not stored yet)
 * 
 * @param {*} section 
 * @param {*} data 
 * @param {*} identifier 
 * @returns void
 */
export const updateUserData = (section, data, identifier = null) => {
  const user = getUserData(identifier);
  const username = identifier || data?.username || user?.profile?.username;
  if (!username) logout();

  setUserData(
    username,
    user
      ? { ...user, [section]: { ...user[section], ...data } }
      : { [section]: { ...data } }
    );
};
