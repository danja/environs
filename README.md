# Environs

*Global Artificial Life*

**Status 2021-11-27** : getting the outline written up before I forget

## Overview

**Environs** is a framework for distributed artificial life. The environment is the Web. Typically organisms are defined in the browser, connections between organisms achieved through resources on Web servers. The basic requirements for interaction are minimal although the description below may make these seem complicated, so a demonstration system based on [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) will be provided. 

![System Outline](https://github.com/danja/environs/raw/main/media/abstract-block.png)

### Connector Host

An *Environs Connector Host* will be a HTTP server which maintains a set of dereferenceable resources. The preferred format/model for these is [JSON-LD](https://en.wikipedia.org/wiki/JSON-LD).
 
### Agents

An *Environs Agent* will typically run in a browser and have the following capabilities :

* HTTP client(s) able to connect to Web resources
* algorithm(s) for manipulating data
* descriptive information about itself  
* (optional) user interface

*Note that the implementation of an agent doesn't necessarily have to run in a browser : 'headless' agents are fine.* 

### Ports

Ports are HTTP resources. They may act as inputs or outputs (or both).

### Vocabularies

* RDF, RDFS, DC etc. for general description 
* DOAP for project-related terms
* [LV2](http://lv2plug.in/ns/lv2core) to provide terms relating to connections

### Goals

* Simple
* Low barrier to entry 
* Extensible
* Compatible with existing standards

### Non-Goals

* Performance

## Life Example

The definition of an individual organisms and agents is arbitrary, the connectivity is what makes them part of **environs**. Here an agent will be an instance of [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) running in the browser.

Life runs on a grid of cells. What happens at the 4 edges of the grid depends on the specific implementation : some use a notional infinite grid, more commonly either cells may *fall off* the edges of the grid or they are reflected across opposing sides in a kind of toroidal topology.

The implementation here will expose the 4 edges of the grid as Web resources. The game engine will read and write to them as usual, but additionally their contents may be read and/or written to by other HTTP agents.

![Life Agent](https://github.com/danja/environs/raw/main/media/life-block.png)



