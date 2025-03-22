export const capitallizeFirstLetter = (val)=>{
if(!val) return ''
return `${val[0].toUpperCase()}${val.slice(1)}`
}

export const generatePlaceholderCard = (column)=>{
    return {
            _id: `${column._id}-placeholder-card`,
           boardId: column.boardId, 
           columnId: column._id,
           FE_PlaceholderCard : true
    }
}