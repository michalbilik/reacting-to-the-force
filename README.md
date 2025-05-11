# Reacting to the Force

A modern React application that lets users explore the Star Wars universe by searching for characters and viewing their detailed information from the Star Wars API.

## Features

- **Character Search**: Find Star Wars characters by name
- **Detailed Information**: View comprehensive character details including:
  - Name, birth year, height, and mass
  - Home planet information
  - Film appearances
  - Vehicles and starships operated
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Fast Performance**: Built with modern React practices for optimal speed

## Prerequisites

Before installing this application, ensure you have the following:

- Node.js (v20 or later)
- npm (v10 or later)
- Git
- AWS CLI (for deployment)
- Terraform (for infrastructure management)

## Installation

To install and run the app on your local machine:

1. Clone the repository:
```
git clone https://github.com/yourusername/reacting-to-the-force.git
```

2. Navigate to the project folder:
```
cd reacting-to-the-force
```

3. Install the dependencies:
```
npm install
```

4. Run the development server:
```
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Deployment

To deploy the application on AWS:

1. Ensure you have AWS CLI configured with appropriate credentials.
2. Ensure Terraform is installed and configured on your machine.
3. Navigate to the infra directory:
```
cd infra
```
4. Run the deployment script:
```
./deploy.sh
```

The script will:
- Install dependencies and build the project
- Initialize and apply Terraform configuration
- Upload the build to an S3 bucket
- Invalidate the CloudFront distribution cache

## Technology Stack

- React 18
- TypeScript
- Vite
- Redux Toolkit & React Redux
- React Router
- Tailwind CSS
- React Three Fiber & Drei (3D rendering for background)
- Axios (API requests)
- AWS (S3, CloudFront)
- Terraform

## License

This project is licensed under the MIT License - see the LICENSE file for details.

