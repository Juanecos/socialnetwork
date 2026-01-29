import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
	base : "/",
  plugins: [react()],
	preview:{
		port:5173,
		staticPort:true,
	},
	server: {
		port: 5173,
		stricPort: true,
		host: '0.0.0.0', 
	}
})
