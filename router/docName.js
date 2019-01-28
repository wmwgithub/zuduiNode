    // let imgArray = {
    //     openid1: {
    //         act1: [],
    //         act2:[],
    //     },
    // }
    function pushImg(openid) {
        this.dataStore = []
        this.add=add
    }
    function add(openid){
        if(this.dataStore.indexOf(openid)==-1){
            this.dataStore.push({openid})
        }
    }
    let imgArray = new pushImg()
    let openidDir = path.join(__dirname, '../act_img')
    fs.readdir(openidDir, (err, dir) => {
        dir.forEach((value)=>{
            // console.log('value',value)
            imgArray.add(value)
            fs.readdir(path.join(openidDir,value),(actErr,actDir)=>{
                imgArray.dataStore[value]={
                    ...actDir
                }
                actDir.forEach((actValue,index)=>{
                    fs.readdir(path.join(openidDir,value,actValue),(imgErr,imgName)=>{
                        imgArray.dataStore[value][index]=
                        console.log(imgArray)
                    })
                })
            })
        })
    })