


const handleSearch = (e, list) => {
    let arr = list;
    let item = arr;

    if(e.target.value !== ''){
        const thiss = item.filter(item => {
            const element = item.name;
            return(
                element.toLowerCase().search(e.target.value.toLowerCase()) !== -1
            );
        });
        return thiss;
    }
}

export default handleSearch;

