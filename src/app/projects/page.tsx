'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ProjectLink from '@/app/projects/projectLink';
import Modal from '@/app/projects/project/modal';
import Layout from '@/components/layout';
import { ModalContext } from './modalContext';

const projects = [
  {
    title: 'COVID-19 Vaccination Tracker',
    src: 'covid19-tn.png',
    description: '',
    href: '',
    tag: 'Data Visualization',
    color: 'white',
  },
  {
    title: 'Spotify Data Analysis',
    src: 'spotify-tn.png',
    href: '',
    tag: 'Data Analysis',
    color: 'black',
  },
  {
    title: 'Vacation Clustering',
    description: '',
    src: 'ML-tn.png',
    href: '',
    tag: 'Machine Learning',
    color: '#EFE8D3',
  },
  {
    title: 'Released PCO Work',
    src: 'pco-tn.png',
    href: '',
    tag: 'Customer Segmentation and Targeting',
    color: 'pink',
  }
];

export default function ProjectsHome() {
  const [modal, setModal] = useState({ active: false, index: 0 });

  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      <Layout title={'My Work'}>
        <div className="m-0">
          <div className="m-0 overflow-hidden">
            {projects.map((project, index) => (
              <Link href={project.href} key={index}>
                <ProjectLink index={index} title={project.title} tag={project.tag} />
              </Link>
            ))}
          </div>

          {/* Modal for previews */}
          <Modal projects={projects} />

          {/* --- Coming soon blurb --- */}
          <footer className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 pb-20">
            <div className="rounded-2xl border border-zinc-200/70 bg-zinc-50/80 px-5 py-4 text-center dark:border-zinc-800/60 dark:bg-zinc-900/40">
              <p className="text-sm sm:text-[15px] text-zinc-600 dark:text-zinc-400">
                <span className="mr-2 inline-block h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-zinc-400/80 animate-pulse" />
                Detailed project pages are{' '}
                <span className="font-medium text-zinc-900 dark:text-zinc-100">coming soon</span>. In the meantime, see{' '}
                <a
                  href="https://github.com/stevnhua"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-zinc-400/60 underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  GitHub
                </a>{' '}
                or{' '}
                <a
                  href="mailto:steven_hua@outlook.com"
                  className="underline decoration-zinc-400/60 underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  email me
                </a>
                .
              </p>
            </div>
          </footer>
          {/* --- /Coming soon blurb --- */}
        </div>
      </Layout>
    </ModalContext.Provider>
  );
}
