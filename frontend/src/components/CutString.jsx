function CutString(props){
    const str = props.str.slice(+props.start, +props.end)
    return <>{str}</>
}

export default CutString;