# Makers Row Factory Admin
This repo contains a project that uses jQuery to consume a flask-powered rest api which allows administrators with Makers Row to view, add, edit, and delete factories in their database.

It is seeded with a few(fake) factories, but feel free to add your own!

![alt tag](https://github.com/sipplified/Makers-Row-Factory-Admin/blob/master/static/img/screenshot.jpg)

## How to Run It
This README file is inside a folder that contains a 'Vagrantfile', which tells Vagrant how to set up your virtual machine in VirtualBox.
To use the vagrant file, you will need to have done the following:

  1. Download and Install [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
  2. Download and Install [Vagrant](https://www.vagrantup.com/downloads.html)
  3. Install [Ansible](http://docs.ansible.com/intro_installation.html)

Once all of that is done, you need to open a shell prompt(terminal on mac) and cd into the root directory of this repo that contains the Vagrantfile. 

Now you can simply type in 'vagrant up', and Vagrant will create a new VM, install the base box, and configure it using the ansible playbook.

You should be able to access the app by going to [http://localhost:7000](http://localhost:7000)

## How to use the api

The Rest Api for this project uses the base route /api/factory

### Get - /api/factory
Returns all of the factories in the database

### POST - /api/factory
Creates a new Factory
  Fields to POST:
      "factory-name",
      "email-address",
      "street-address",
      "factory-tags"
    
### Get - /api/factory/factory_id
Returns information for the factory with the id factory_id

### PUT - /api/factory/factory_id
Updates information for the factory with the id factory_id

### DELETE - /api/factory/factory_id
Deletes the factory with the id factory_id


## Known Problems
 - Error checking on form submits
 - Errors thrown if searching for factory that doesn't exist
 - Map sometimes pans out into the ocean. Reloading the browser usually corrects it
