const base = {
    get() {
                return {
                url : "http://localhost:8080/collect/",
                name: "collect"
            }
            },
    getProjectName(){
        return {
            projectName: "JungleSniper"
        } 
    }
}
export default base