import * as services from './services';
const searchNames = (term) => {
   const matches = services.getName().filter((name) =>{
    return name.includes(term)
   })
//只想要三分之一的搜索结果
 return matches.length > 3 ? matches.slice(0,3) : matches;
}

export default searchNames; 