const search = async q => {
    const res = await fetch(`http://localhost:5000/DB/tbl_admin/Search?q=${q}`);
    const json = await res.json();
    return json;
}

module.exports.search = search;