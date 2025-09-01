export function SvgIcon({ iconName, style }) {
    

    const src= `assets/svgs/${iconName}.svg`
    const imgStyle = style ? style : {
            width:'40px',
            height:'40px'
        };
    return (
        <img 
                    src={src} 
                    alt="Tag Icon" 
                    className=""
                    style={imgStyle} />
    )
}
