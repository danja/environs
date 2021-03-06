# Environs

_Global Artificial Life_

*...and Web of Things*

### Status

**2021-12-24** : Realised the server component of this should also lend itself to controlling the various microcntrolled based projects I'm working on. 

**2021-12-24** : Bugs in Life fixed.

**2021-12-21** : Life still buggy, but very close. Out-by-one errors at the age of 57.

**2021-12-20** : made a crude (still buggy) version of Conway's Game of Life using HTML canvas, live at : https://hyperdata.it/environs/life/

**2021-11-27** : still writing up _this_ but have cobbled together a simple Node HTTP server that can do GET and PUT against filesystem.

**TODO next** :

- find/write a simple browser-based Life implementation
- hook up the Ajax to ^^, put it on my server
- figure out the service & client descriptions (metadata)

## Overview

**Environs** is a framework for distributed artificial life. The environment is the Web. Typically organisms are defined in the browser, connections between organisms achieved through resources on Web servers. The basic requirements for interaction are minimal although the description below may make these seem complicated, so a demonstration system based on [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) will be provided.

![System Outline](https://github.com/danja/environs/raw/main/docs/media/abstract-block.png)

### Connector Host

An _Environs Connector Host_ will be a HTTP server which maintains a set of dereferenceable resources. The preferred format/model for these is [JSON-LD](https://en.wikipedia.org/wiki/JSON-LD).

### Agents

An _Environs Agent_ will typically run in a browser and have the following features :

- HTTP client(s) able to connect to Web resources
- algorithm(s) for manipulating data
- descriptive information about itself
- (optional) user interface

_Note that the implementation of an agent doesn't necessarily have to run in a browser : 'headless' agents are fine._

### Agent Connectors

Agent Connectors are HTTP resources. They may act as inputs or outputs (or both). A twist on Roy's HATEOS, the Web server as repository of connection state.

#### HTTP Methods & Media Types

_Provisionally :_

A resource, the **Index** (with arbirary URL), should respond to -

- HTTP GET, requesting a HTML media type with a description and/or visualization of any associated Agent Connectors

eg. `Accept: text/html, application/xhtml+xml, application/xml;q=0.9, image/webp, */*;q=0.8`

- HTTP GET, requesting an RDF media type with a description of any associated Agent Connectors plus any other relevant metadata

eg. `Accept: text/turtle`

**TBD** _may_ HTTP POST at the index URL for data submission?

Each **Agent Connector** URL should respond to -

- HTTP GET, requesting a JSON-LD representing the current state of the identified connector

**TBD** preferred format - which is best for lists..? Just use a binary?

eg. `Accept: application/ld+json;profile=http://www.w3.org/ns/json-ld#expanded`

- HTTP PUT, requesting the replacement of the current state of the identified connector with a new one

// PUT returns a Created, OK or No Content

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
- Synchronous behaviour

## Life Example

The definition of an individual organisms and agents is arbitrary, the connectivity is what makes them part of **environs**. Here an agent will be an instance of [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) running in the browser.

Life runs on a grid of cells. What happens at the 4 edges of the grid depends on the specific implementation : some use a notional infinite grid, more commonly either cells may _fall off_ the edges of the grid or they are reflected across opposing sides in a kind of toroidal topology.

The implementation here will expose the 4 edges of the grid as Web resources. The game engine will read and write to them as usual, but additionally their contents may be read and/or written to by other HTTP agents. Thus multiple small grids may be joined together to form a larger grid. Note that this will almost certainly not follow the conventional rules of Life at the edges as the connections between grids will be asynchronous.

![Life Agent](https://github.com/danja/environs/raw/main/docs/media/life-block.png)

// Work out more : the material being passed around is arbitrary data, subject to a few conventions : HTTP specs etc, so really anything goes. I think it makes sense to partition 'namespaces' server-side, so for me http://hyperdata.it/environs/limited-space-here. The intention is to make all URLs self-describing anyway, so opaque naming (maybe a hash of a name or whatever, http://hyperdata.it/environs/FC12). For each of those resources, perhaps have a low, arbitrary data size limit for practical reasons and to encourage distribution of data (say 1MB per URL?).
There will also need to be some kind of conventions on sharing agents names, descriptions etc. I think it would be more fun to _not_ have any access controls (at least initially), within this - any agent can read/write wherever they like. Potentially an extra challenge for anyone wishing to address the shared spaces.

// Note somewhere : Same infrastructure (basically HTTP) could be used to distribute neural networks or just do chat or even share porn (with a 1MB limit) - it's the Web after all.
