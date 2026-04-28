import React from "react";

export const GithubIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className={className}>
		<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.5-1.4 6.5-7a4.6 4.6 0 0 0-1.39-3.23 4.2 4.2 0 0 0-.13-3.22s-1.12-.36-3.6 1.32a12.4 12.4 0 0 0-6.5 0C8.12 1.36 7 1.72 7 1.72a4.2 4.2 0 0 0-.13 3.22A4.6 4.6 0 0 0 5.5 8.16c0 5.58 3.35 6.64 6.5 7.02a4.8 4.8 0 0 0-1 3.02V22"></path>
		<path d="M9 20.5 5 19.5"></path>
	</svg>
);

export const LinkedinIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className={className}>
		<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
		<rect
			width="4"
			height="12"
			x="2"
			y="9"></rect>
		<circle
			cx="4"
			cy="4"
			r="2"></circle>
	</svg>
);

export const InstagramIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className={className}>
		<rect
			width="20"
			height="20"
			x="2"
			y="2"
			rx="5"
			ry="5"></rect>
		<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
		<line
			x1="17.5"
			x2="17.51"
			y1="6.5"
			y2="6.5"></line>
	</svg>
);
