# 🐧 Ubuntu Setup Guide - Budget & House Finder App

## 📋 Prerequisites for Ubuntu

### 1. Update System
```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Install Node.js and npm
```bash
# Install Node.js 18+ (recommended)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version  # Should be v18+
npm --version   # Should be 9+
```

### 3. Install Git (if not already installed)
```bash
sudo apt install git -y
```

### 4. Install Build Tools (needed for some dependencies)
```bash
sudo apt install build-essential -y
```

## 🚀 Running the App on Ubuntu

### Step 1: Clone the Repository
```bash
# Navigate to your preferred directory
cd ~/
mkdir projects && cd projects

# Clone the repository
git clone https://github.com/knoticoo/Budget.git
cd Budget/budget-house-app
```

### Step 2: Install Dependencies
```bash
# Install all project dependencies
npm install

# If you encounter permission issues, try:
sudo npm install --unsafe-perm=true --allow-root
```

### Step 3: Set Up Environment Variables
```bash
# Copy environment template
cp .env.example .env

# Edit the .env file with your preferred editor
nano .env
# or
gedit .env
# or
code .env  # if you have VS Code installed
```

### Step 4: Start the Development Server
```bash
# Start the app
npm start

# The app will open automatically at http://localhost:3000
# If it doesn't open automatically, open your browser and go to:
# http://localhost:3000
```

### Step 5: Build for Production (Optional)
```bash
# Create optimized production build
npm run build

# Serve the production build locally
npx serve -s build -p 3000
```

## 📱 Wrapping as Mobile/Desktop Apps on Ubuntu

### Option 1: Capacitor (Mobile Apps - iOS/Android)

#### Install Capacitor
```bash
# Install Capacitor CLI globally
sudo npm install -g @capacitor/cli

# Navigate to your project
cd ~/projects/Budget/budget-house-app

# Initialize Capacitor
npx cap init BudgetHouseApp com.yourcompany.budgethouseapp
```

#### Add Platforms
```bash
# Add Android platform
npx cap add android

# Add iOS platform (requires macOS, but you can prepare)
npx cap add ios
```

#### Build and Sync
```bash
# Build the web app first
npm run build

# Sync with native platforms
npx cap sync
```

#### Android Development Setup
```bash
# Install Android Studio dependencies
sudo apt install openjdk-11-jdk -y

# Download Android Studio
wget https://redirector.gvt1.com/edgedl/android/studio/ide-zips/2023.1.1.28/android-studio-2023.1.1.28-linux.tar.gz

# Extract Android Studio
tar -xzf android-studio-*.tar.gz
sudo mv android-studio /opt/

# Add to PATH (add to ~/.bashrc)
echo 'export PATH="$PATH:/opt/android-studio/bin"' >> ~/.bashrc
source ~/.bashrc

# Start Android Studio
studio.sh
```

#### Open in Android Studio
```bash
# Open the Android project
npx cap open android
```

### Option 2: Electron (Desktop App)

#### Install Electron
```bash
# Navigate to your project
cd ~/projects/Budget/budget-house-app

# Install Electron as dev dependency
npm install --save-dev electron

# Install additional Electron tools
npm install --save-dev electron-builder
```

#### Create Electron Main Process
```bash
# Create electron main file
cat > electron.js << 'EOF'
const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: path.join(__dirname, 'assets/icon.png') // Add your icon
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
EOF
```

#### Install electron-is-dev
```bash
npm install --save electron-is-dev
```

#### Update package.json
```bash
# Add electron scripts to package.json
npm pkg set scripts.electron="electron ."
npm pkg set scripts.electron-dev="ELECTRON_IS_DEV=true electron ."
npm pkg set scripts.electron-build="electron-builder"
npm pkg set main="public/electron.js"
```

#### Move electron.js to public folder
```bash
mv electron.js public/
```

#### Run Electron App
```bash
# Start the web app first (in one terminal)
npm start

# In another terminal, start Electron
npm run electron-dev
```

#### Build Electron App for Distribution
```bash
# Build web app first
npm run build

# Build Electron app
npm run electron-build
```

### Option 3: AppImage (Linux Desktop App)

#### Install electron-builder with AppImage support
```bash
npm install --save-dev electron-builder

# Create build configuration
cat > electron-builder.json << 'EOF'
{
  "appId": "com.yourcompany.budgethouseapp",
  "productName": "Budget House App",
  "directories": {
    "buildResources": "build"
  },
  "files": [
    "build/**/*",
    "node_modules/**/*",
    "public/electron.js"
  ],
  "linux": {
    "target": [
      {
        "target": "AppImage",
        "arch": ["x64"]
      },
      {
        "target": "deb",
        "arch": ["x64"]
      },
      {
        "target": "rpm",
        "arch": ["x64"]
      }
    ],
    "category": "Finance"
  }
}
EOF
```

#### Build Linux Packages
```bash
# Build for Linux
npm run build
npx electron-builder --linux
```

### Option 4: PWA (Progressive Web App)

#### Make it a PWA
```bash
# Install PWA dependencies
npm install --save-dev workbox-webpack-plugin

# The app is already configured for PWA with the manifest.json
# Just build and serve over HTTPS
npm run build

# Install serve with HTTPS support
sudo npm install -g serve

# Serve with HTTPS (for PWA features)
serve -s build -p 443 --ssl-cert path/to/cert.pem --ssl-key path/to/key.pem
```

## 🔧 Troubleshooting Ubuntu Issues

### Node.js Permission Issues
```bash
# Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### Port Already in Use
```bash
# Find and kill process using port 3000
sudo lsof -ti:3000 | xargs sudo kill -9

# Or use a different port
PORT=3001 npm start
```

### Build Errors
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Memory Issues
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

## 📦 Distribution on Ubuntu

### Create .deb Package
```bash
# Using electron-builder
npx electron-builder --linux deb

# The .deb file will be in dist/ folder
# Install with:
sudo dpkg -i dist/budget-house-app_1.0.0_amd64.deb
```

### Create AppImage
```bash
# Build AppImage
npx electron-builder --linux AppImage

# The AppImage will be in dist/ folder
# Make executable and run:
chmod +x dist/Budget\ House\ App-1.0.0.AppImage
./dist/Budget\ House\ App-1.0.0.AppImage
```

### Create Snap Package
```bash
# Install snapcraft
sudo apt install snapcraft -y

# Create snapcraft.yaml
mkdir snap
cat > snap/snapcraft.yaml << 'EOF'
name: budget-house-app
version: '1.0.0'
summary: Budget and House Finder App
description: |
  A modern web app for budget management and house searching
  with Revolut integration and ss.lv property search.

base: core20
confinement: strict
grade: stable

apps:
  budget-house-app:
    command: budget-house-app
    plugs: [network, network-bind, desktop, desktop-legacy]

parts:
  budget-house-app:
    plugin: nodejs
    source: .
    npm-include-node: true
    npm-node-version: "18.19.0"
EOF

# Build snap
snapcraft
```

## 🚀 Quick Start Script

Create a quick start script:

```bash
cat > start-budget-app.sh << 'EOF'
#!/bin/bash

echo "🚀 Starting Budget & House Finder App on Ubuntu"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Installing..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Check if project exists
if [ ! -d "budget-house-app" ]; then
    echo "📥 Cloning repository..."
    git clone https://github.com/knoticoo/Budget.git
    cd Budget/budget-house-app
else
    cd budget-house-app
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the app
echo "🌟 Starting the app at http://localhost:3000"
npm start
EOF

chmod +x start-budget-app.sh
```

## 📱 Mobile Development on Ubuntu

### For Android Development
1. Install Android Studio from the steps above
2. Set up Android SDK and emulator
3. Use `npx cap run android` to run on emulator/device

### For iOS Development (requires macOS)
- Set up the project with `npx cap add ios`
- Transfer the project to macOS for final iOS build
- Or use cloud build services like EAS Build

## 🎉 Summary

Your Budget & House Finder App can be:
- ✅ **Run directly** on Ubuntu with `npm start`
- ✅ **Wrapped as Android app** using Capacitor + Android Studio
- ✅ **Packaged as desktop app** using Electron
- ✅ **Distributed as AppImage/deb** for Linux users
- ✅ **Made into PWA** for mobile web use

Choose the method that best fits your distribution needs!