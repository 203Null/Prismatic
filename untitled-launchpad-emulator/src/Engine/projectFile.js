class ProjectFile
{
  info = {};
  keySound = undefined;
  autoplay = undefined;
  keyLED = undefined;

  constructor(file) {
    this.unpack(file);
  }
  
  async unpack(projectFile)
  {
    var files = undefined
    let JSZip = require("jszip");
    await JSZip.loadAsync(projectFile).then(function(zip){
      files = Object.values(zip.files);
    }, function (e) {
      alert("Failed to extract selected file");
      console.log(e);
      return;
    });

    let projectRoot = undefined;
    let keySoundFile = undefined;
    let autoplayFile = undefined;
    let soundFiles = {};
    let keyLEDFiles = [];

    //Load info and categorize files
    for(let file of files){
      if(!file.name.endsWith("/")) //Ignore folder
      {
        if(file.name.toLowerCase().includes("sounds/")) //Audio
        {
          console.log("Sound file: " + file.name);
          soundFiles[file.name] = file;
        }
        else
        {
          if(file.name.toLowerCase().endsWith("info")) //Text
          {
            let text = await file.async("text");
            text = text.split(/\r?\n/);
            console.log("Info file: " + file.name);
            projectRoot = file.name.slice(0, -4); 
            console.log(" project root: " + projectRoot);
            text.forEach(info => this.info[info.split('=')[0]] = info.split('=')[1]);
            this.info["buttonX"] = parseInt(this.info["buttonX"]);
            this.info["buttonY"] = parseInt(this.info["buttonY"]);
            this.info["chain"] = parseInt(this.info["chain"]);
            this.info["squareButton"] != "true"
            this.info["landscape"] != "true"
            console.log(" title: " + this.info["title"])
            console.log(" producerName: " + this.info["producerName"])
            console.log(" buttonX: " + this.info["buttonX"])
            console.log(" buttonY: " + this.info["buttonY"])
            console.log(" chain: " + this.info["chain"])
            console.log(" squareButton: " + this.info["squareButton"])
            console.log(" landscape: " + this.info["landscape"])
            if(this.info["buttonX"] != 8 || this.info["buttonY"] != 8)
            {
              alert("Only 8x8 Unipad project are supported");
              return;
            }
            if(this.info["chain"] > 8)
            {
              alert("Only Unipad project that has within 8 chains are supported");
              return;
            }
          }
          else if(file.name.toLowerCase().endsWith("keysound"))
          {
            console.log("KeySound file: " + file.name);
            keySoundFile = text;
          }
          else if(file.name.toLowerCase().endsWith("autoplay"))
          {
            console.log("AutoPlay file: " + file.name);
            autoplayFile = text;
          }
          else if(file.name.toLowerCase().includes("keyled/"))
          {
            console.log("KeyLED file: " + file.name);
            keyLEDFiles.push(file);
          }
          else
          {
            console.log("Unknown file: " + file.name);
          }
        }
      }
    }

    //Initialize 4D arraies
    this.keySound = new Array(this.info.chain).fill(null).map(
              () => new Array(this.info.buttonX).fill(null).map(
              () => new Array(this.info.buttonY).fill(null).map(
              () => new Array())));
              
    this.keyLED = new Array(this.info.chain).fill(null).map(
            () => new Array(this.info.buttonX).fill(null).map(
            () => new Array(this.info.buttonY).fill(null).map(
            () => new Array())));

    // Load keyLED
    for(file of keyLEDFile)
    {
      let fileInfo = file.name.split(" ");
      this.keyLED[fileInfo[0] - 1][fileInfo[1] - 1][]
      
    }
  }
}

export default ProjectFile;