function App(){
    const handleChangeFilev= (e) => {
        const file = e.target.files[0];
        console.log(_file.size)
    }
    return(
        <div>
            <input type="file" onChange={handleChangeFilev} />
        </div>
    )
}

export default App