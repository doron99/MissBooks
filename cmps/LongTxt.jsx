const { useState, useEffect } = React
//todo: finish
export function LongTxt({ txt, length = 100, classes = "" }) {
    const [isShowMore,setIsShowMore] = useState(false);
    
    if (!txt || txt.length === 0) return null;

    function toggle() {
        setIsShowMore(prevIsShowMore => !prevIsShowMore)
    }

    const innerClassNames = "long-txt " + classes

    if (txt.length < length) {
        return <span className={innerClassNames}>{txt}</span>
    }
    return isShowMore 
    ? <span className={innerClassNames}>{txt} <a onClick={toggle}>view less</a></span>
    : <span className={innerClassNames}>{txt.substring(0,length)} <a onClick={toggle}>show more</a></span>

}