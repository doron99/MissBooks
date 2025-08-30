const { useState, useEffect } = React
//todo: finish
export function LongTxt({ txt, length = 100 }) {
    const [isShowMore,setIsShowMore] = useState(false);
    
    if (!txt || txt.length === 0) return null;

    function toggle() {
        setIsShowMore(prevIsShowMore => !prevIsShowMore)
    }
    if (txt.length < length) {
        return <span>{txt}</span>
    }
    return isShowMore 
    ? <span className="long-txt">{txt} <a onClick={toggle}>show less</a></span>
    : <span className="long-txt">{txt.substring(0,length)} <a onClick={toggle}>show more</a></span>

}