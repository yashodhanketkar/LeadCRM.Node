CRM - Leads
===========

Simple a full stack application for lead management.

Techstack
---------

-	Express.js
-	TypeScript
-	PostgreSQL
-	React
-	Zustand
-	React Hook Form
-	Zod Validation

### How to run

1.	Create a `.env.dev` file in the server folder with the following content:

	```sh
	DB_URL= # pglink
	JWT_SECRET= # 16+char hex
	PORT= # number
	```

2.	Install dependencies and run the server:

	```sh
	pnpm install
	pnpm build
	pnpm start
	```

3.	Create a `.env` file in the client folder with the following content:

	```sh
	VITE_API_URL= # url to the server (in this case http://localhost:3000)

	```

4.	Install dependencies and run the client:

	```sh
	pnpm install
	pnpm dev # dev mode
	pnpm build && pnpm preview # prod mode
	```

### License

This project is licensed under the GPL-3.0 License - see the [LICENSE](./LICENSE) file for details.
