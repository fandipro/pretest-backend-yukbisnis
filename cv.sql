--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

-- Started on 2022-07-19 20:03:07

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 211 (class 1259 OID 101762)
-- Name: educations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.educations (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    school character varying(255) NOT NULL,
    major character varying(255),
    address text NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    type character varying(20) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone
);


ALTER TABLE public.educations OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 101751)
-- Name: experiences; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.experiences (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    company character varying(255) NOT NULL,
    "position" character varying(255) NOT NULL,
    address text NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    type character varying(20) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone
);


ALTER TABLE public.experiences OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 101746)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    phone_number character varying(20) NOT NULL,
    address text NOT NULL,
    email character varying(255) NOT NULL,
    photo character varying(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 3321 (class 0 OID 101762)
-- Dependencies: 211
-- Data for Name: educations; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3320 (class 0 OID 101751)
-- Dependencies: 210
-- Data for Name: experiences; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3319 (class 0 OID 101746)
-- Dependencies: 209
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3179 (class 2606 OID 101769)
-- Name: educations educations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.educations
    ADD CONSTRAINT educations_pkey PRIMARY KEY (id);


--
-- TOC entry 3177 (class 2606 OID 101757)
-- Name: experiences experiences_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.experiences
    ADD CONSTRAINT experiences_pkey PRIMARY KEY (id);


--
-- TOC entry 3175 (class 2606 OID 101760)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id, name, phone_number, address, email);


-- Completed on 2022-07-19 20:03:07

--
-- PostgreSQL database dump complete
--

