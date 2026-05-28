CRM - Leads APP API
===================

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
