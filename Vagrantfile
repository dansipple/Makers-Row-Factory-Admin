VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "ubuntu/trusty64"

  config.vm.network "forwarded_port", guest: 5000, host: 7000

  config.vm.provision :ansible do |ansible|
    ansible.playbook = "playbook.yml"
  end
end