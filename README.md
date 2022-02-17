# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Server Configuration

The following configuration is required to use this project. Server project is expecting "./config.env" file.

ATLAS_URI= [MongoDB URI]

PORT= [Defaults to 5000]

TOKEN_SECRET=3FkwGUGu3n4AZokmU1AfKVhyonjXek7qjtDm/6CYmgwZ78wAP+jJHWxGdqCaFtW+GxSo8KIVoSqxCrREQwH1MjFb765if0yMC5RVPYGSJDfvbjQxpKX9GXeBddEuSXuSpx6r+e6DWOJgoCGvEux6mH5KUyc4EXYU5WtQvq3tW3iqFdh5NN7eCDdYOn+MCDR7jfp8GP+NMYqzsb6FtVmQF/hs6Mp6Lr8papbUOiKIzh7lQjCOoZJVvg4XOnPTtNPJGCaW5MSqj6FoXwT32BIYhIiDpULkwHLFsS7tjoS2XWU14jXnFtcv045wkS5FHwemBU8qQN2ogNbx7cy4hSn8CA==


Note: TOKEN_SECRET is the private key used for signing JWT. Feel free to use for testing or generate your own.


## Cient Configuration

Be sure to update the index.js file and make sure "window.$apiURL" is pointing to the expect base URL for the web service.