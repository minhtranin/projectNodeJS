class aws {
    constructor (){
        this.named =' minh'
    }
    static uploadvideo(){
        
        return this.named
        
    }
}

const cmd = new aws()
const ham = aws.uploadvideo()
console.log(ham);
