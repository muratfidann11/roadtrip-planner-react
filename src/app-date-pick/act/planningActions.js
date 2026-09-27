export const startPlanning = () => ({type:'planning/start'});
export const goCities = () => ({type:'planning/goCities'});
export const toggleDate = (index) => ({type:'planning/toggleDate', payload:index});
export const resetPlanning = () => ({type:'planning/reset'});
export const selectCity = (city) => ({type:'planning/selectCity', payload:city});
export const selectCategory = (index) => ({type:'planning/selectCategory', payload:index});
export const setScore = ({categoryId,name,score}) => ({type:'planning/setScore',payload:{categoryId,name,score}});
export const submitRound = () => ({type:'planning/submitRound'});
export const nextCategory = () => ({type:'planning/nextCategory'});
