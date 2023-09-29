//TAGS
export const Tags = ({ tag }) => {

    //couleur aléatoire pour chaque tag
    const tagColors = (tag) => {
      if(!tag) return;
    //get Random color
    let hash = 0;
    for (let i = 0; i < tag.length; i++) {
        hash = tag.charCodeAt(i) + ((hash << 5) - hash);
    }

      // Use the hash value to select a color from your array of colors
      let colors = [];
       colors = [
        'bg-indigo-400', 'bg-pink-400', 'bg-purple-400',
        'bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-orange-400',
        'bg-indigo-500', 'bg-pink-500', 'bg-purple-500', 'bg-gray-500',
        'bg-pink-300', 'bg-purple-300', 'bg-orange-500',
        'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-blue-500',
        'bg-red-300', 'bg-green-300',
        ];
     
      const randomIndex = Math.abs(hash) % colors.length;
      return colors[randomIndex];
    }
    
    
    return (
        <div className={`shadow-xl m-1 text-center h-7 px-2 rounded-sm flex justify-center items-center text-white font-semibold ${tagColors(tag)}`}>
            {tag}
        </div>
    )
}