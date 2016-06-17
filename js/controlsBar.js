function getTopRoute(href){
    return href.substr(0, href.slice(0, -1).lastIndexOf("/") + 1)
}