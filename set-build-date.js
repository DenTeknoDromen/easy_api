const { exec } = require("child_process");

// Sets the build date of the docker image as a environment variable
// Used for testing purposes
function setBuildDate() {
    exec("cat ./build_date", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        process.env.BUILD_DATE = `${stdout}`
        console.log("Build date saved as environment variable")
    })
}

module.exports = {
    setBuildDate
}