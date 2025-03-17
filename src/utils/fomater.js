export const capitallizeFirstLetter = (val)=>{
if(!val) return ''
return `${val[0].toUpperCase()}${val.slice(1)}`
}

