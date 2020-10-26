# Nuki Permissioned Blockchain Application

This project is developed for the course Blockchain architecture within the minor Blockchaining. This project contains a PoC of a permissioned blockchain using Hyperledger Composer as a framework. The PoC illustrates how Hyperledger Composer can be used to build a permissioned blockchain to perform lock operations on a lock.

### Installation

This project requires Hyperledger Composer V0.19. The prerequisites to get this project working can be installed from [here](https://hyperledger.github.io/composer/v0.19/installing/installing-prereqs). After this, the Hyperledger Components need to be installed, these can be installed from [here](https://hyperledger.github.io/composer/v0.19/installing/development-tools).

After the installation of the prerequisites and Composer components, the project can be build with the following commands:

(These commands assume that this project is cloned into the directory "fabric-dev-servers", which is generated when Hyperledger Composer was installed on your system.)

```sh
$ cd ~/fabric-dev-servers
$ export FABRIC_VERSION=hlfv11
$ ./startFabric
$ ./createPeerAdminCard
$ cd lock-network
$ composer network install --card PeerAdmin@hlfv1 --archiveFile lock-network.bna
$ composer network start --networkName lock-network --networkVersion 0.0.2-deploy.3 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card
$ composer card import --file networkadmin.card
```

The blockchain network should be running now. In order to communicate with the defined and running blockchain, the files in the [application directory](https://github.com/daneshlachman/Nuki-blockchain-application/tree/master/application) can be used. These files can be used to:

- Add a user to the blockchain (a blockchain participant)
- Add a new lock to the blockchain (a blockchain asset)
- Perform a lock operations on a defined lock (a blockchain transaction)
