# Path to the directory containing the Node.js binaries managed by fnm
$env:PATH = "C:\Users\katrina.wheelan\AppData\Local\fnm_multishells\16876_1721243502148;$env:PATH"
$env:FNM_NODE_DIST_MIRROR = "https://nodejs.org/dist"
$env:FNM_RESOLVE_ENGINES = "false"
$env:FNM_MULTISHELL_PATH = "C:\Users\katrina.wheelan\AppData\Local\fnm_multishells\16876_1721243502148"
$env:FNM_COREPACK_ENABLED = "false"
$env:FNM_VERSION_FILE_STRATEGY = "local"
$env:FNM_LOGLEVEL = "info"
$env:FNM_ARCH = "x64"
$env:FNM_DIR = "C:\Users\katrina.wheelan\AppData\Roaming\fnm"
# Activate the Node.js version managed by fnm
fnm use 20
Write-Output "ran setup script"