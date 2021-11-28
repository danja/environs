# Environs

_Global Artificial Life_

**Status 2021-11-27** : still writing up _this_ but have cobbled together a simple Node HTTP server that can do GET and PUT against filesystem.

**TODO next** :

- find/write a simple browser-based Life implementation
- hook up the Ajax to ^^, put it on my server
- figure out the service & client descriptions (metadata)

## Overview

**Environs** is a framework for distributed artificial life. The environment is the Web. Typically organisms are defined in the browser, connections between organisms achieved through resources on Web servers. The basic requirements for interaction are minimal although the description below may make these seem complicated, so a demonstration system based on [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) will be provided.

![System Outline](https://github.com/danja/environs/raw/main/media/abstract-block.png)

### Connector Host

An _Environs Connector Host_ will be a HTTP server which maintains a set of dereferenceable resources. The preferred format/model for these is [JSON-LD](https://en.wikipedia.org/wiki/JSON-LD).

### Agents

An _Environs Agent_ will typically run in a browser and have the following features :

- HTTP client(s) able to connect to Web resources
- algorithm(s) for manipulating data
- descriptive information about itself
- (optional) user interface

_Note that the implementation of an agent doesn't necessarily have to run in a browser : 'headless' agents are fine._

### Ports

Ports are HTTP resources. They may act as inputs or outputs (or both). Not Roy's HATEOS, the Web server as repository of connection state.

### Vocabularies

- RDF, RDFS, DC etc. for general description
- DOAP for project-related terms
- [LV2](http://lv2plug.in/ns/lv2core) to provide terms relating to connections

### Goals

- Simple
- Low barrier to entry
- Extensible
- Compatible with existing standards

### Non-Goals

- Performance

## Life Example

The definition of an individual organisms and agents is arbitrary, the connectivity is what makes them part of **environs**. Here an agent will be an instance of [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) running in the browser.

Life runs on a grid of cells. What happens at the 4 edges of the grid depends on the specific implementation : some use a notional infinite grid, more commonly either cells may _fall off_ the edges of the grid or they are reflected across opposing sides in a kind of toroidal topology.

The implementation here will expose the 4 edges of the grid as Web resources. The game engine will read and write to them as usual, but additionally their contents may be read and/or written to by other HTTP agents. Thus multiple small grids may be joined together to form a larger grid. Note that this will almost certainly not follow the conventional rules of Life at the edges as the connections between grids will be asynchronous.

![Life Agent](https://github.com/danja/environs/raw/main/media/life-block.png)

// Work out more : the material being passed around is arbitrary data, subject to a few conventions : HTTP specs etc, so really anything goes. I think it makes sense to partition 'namespaces' server-side, so for me http://hyperdata.it/environs/limited-space-here. The intention is to make all URLs self-describing anyway, so opaque naming (maybe a hash of a name or whatever, http://hyperdata.it/environs/FC12). For each of those resources, perhaps have a low, arbitrary data size limit for practical reasons and to encourage distribution of data (say 1MB per URL?).
There will also need to be some kind of conventions on sharing agents names, descriptions etc. I think it would be more fun to _not_ have any access controls (at least initially), within this - any agent can read/write wherever they like. Potentially an extra challenge for anyone wishing to address the shared spaces.

// Note somewhere : Same infrastructure (basically HTTP) could be used to distribute neural networks or just do chat or even share porn (with a 1MB limit) - it's the Web after all.
