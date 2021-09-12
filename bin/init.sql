create table artists
(
    id         varchar not null
        constraint artist_pk
            primary key,
    name       varchar,
    popularity integer,
    followers  integer
);

alter table artists
    owner to admin;

create table tracks
(
    id           varchar not null
        constraint tracks_pk
            primary key,
    name         varchar,
    popularity   integer,
    duration     integer,
    explicit     integer,
    release_date varchar,
    artist_id    varchar
        constraint tracks_artists_id_fk
            references artists,
    played       integer
);

alter table tracks
    owner to admin;