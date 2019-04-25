export const isUserAchieved = (userAchievements, newAchievement) => {
  const isAchieved = userAchievements.find(({id}) => id === newAchievement.id);
  return isAchieved;
};
