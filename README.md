# Makers Row Factory Admin

## Requirements
This README file is inside a folder that contains a 'Vagrantfile', which tells Vagrant how to set up your virtual machine in VirtualBox.
To use the vagrant file, you will need to have done the following:

  1. Download and Install [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
  2. Download and Install [Vagrant](https://www.vagrantup.com/downloads.html)
  3. Install [Ansible](http://docs.ansible.com/intro_installation.html)

Once all of that is done, you need to open a shell prompt(terminal on mac) and cd into the root directory that contains the Vagrantfile and the other scripts contained in this repo. Now you can simply type in 'vagrant up', and Vagrant will create a new VM, install the base box, and configure it using the ansible playbook.

You should be able to access the app by going to http://localhost:7000
