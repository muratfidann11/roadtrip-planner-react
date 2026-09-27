import {createSlice} from '@reduxjs/toolkit';
import {CITY_DATA} from '../../data/cityData';
const initialState={dates:[],city:null,catIndex:0,round:1,scores:{},winners:{},screen:'welcome'};
const slice=createSlice({name:'planning',initialState,reducers:{
 toggleDate:(s,a)=>{const i=a.payload;s.dates=s.dates.includes(i)?s.dates.filter(x=>x!==i):[...s.dates,i]},
 reset:s=>Object.assign(s,initialState),
 start:(s)=>{s.screen='dates'},
 goCities:(s)=>{if(s.dates.length)s.screen='cities'},
 setScreen:(s,a)=>{s.screen=a.payload},
 selectCity:(s,a)=>{s.city=a.payload;s.catIndex=0;s.round=1;s.scores={};s.winners={};s.screen='categories'},
 selectCategory:(s,a)=>{s.catIndex=a.payload;s.round=1;s.screen='vote'},
 setScore:(s,a)=>{const {categoryId,name,score}=a.payload;s.scores[categoryId]??={current:{},eliminated:[]};s.scores[categoryId].current[name]=score},
 submitRound:s=>{
   const cat=CITY_DATA[s.city].categories[s.catIndex];const data=s.scores[cat.id]??={current:{},eliminated:[]};
   const active=cat.items.filter(x=>!data.eliminated.includes(x.name));
   const max=Math.max(...active.map(x=>data.current[x.name]||0)); const winners=active.filter(x=>data.current[x.name]===max);
   if(winners.length===1){const w=winners[0];s.winners[cat.id]={...w,rating:max};s.screen='result'}
   else {data.eliminated.push(...active.filter(x=>data.current[x.name]!==max).map(x=>x.name));data.current={};s.round+=1}
 },
 nextCategory:s=>{const cats=CITY_DATA[s.city].categories;if(s.catIndex<cats.length-1){s.catIndex+=1;s.round=1;s.screen='categories'}else{s.screen='done'}}
}}); export default slice.reducer;
