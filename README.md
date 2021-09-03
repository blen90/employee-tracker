# Employee Tracker

[![GitHub license](https://img.shields.io/badge/License-MIT-blue.svg)]()

# Description

This app allows the user to manage an employee database with MYSQL. The user can view, add and select roles, departments and employees. 


## Screenshots of the app

![Employee Tracker](./screenshot/demo-screenshot.jpg)

## Demo of the app

(Click on the image below to be redirected to the Youtube demo video)

[![Employee Tracker Demo](./screenshot/demo-screenshot.jpg)](https://youtu.be/SZzkB85ZCI4)


# Table of Contents

* [Installation](#installation)
    
* [Usage](#usage)

* [Technology](#technology)

* [License](#license)

* [Contributors](#contributors)

* [Questions](#questions)

# Installation


* Open VS Code
* Open the schema file in the folder ** ./db/schema.sql and copy the content in the file
* Open MySQLWorkbench
* Paste the content you copied from the schema file to create the DB
* Go to the root of the folder and type to seed the tables you created on MYSQLWorkbench
```npm run seed ```

* Once you verify the tables have been seeded run the following command in the root of the project so you access the server

```node server.js```


# Usage

The user can view, add and select roles, departments and employee using the command line. These results will appear in a table. 

# Technology

* NodeJs
* InquirerJs
* MySQL

# License 

This project is governed by: MIT License

# Contributors

Blenda Orellana

# Questions

If you have any questions about the repo or the app please feel free to contact me
 * Email: blen.or90@gmail.com
 * Github: https://github.com/blen90
