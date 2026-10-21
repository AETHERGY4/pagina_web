import React, { useState } from 'react';
import { X, Server, Database, Terminal, Globe, ShieldCheck, Check, Copy, ExternalLink, Cpu, Sparkles, ArrowRight } from 'lucide-react';

interface DeploymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeploymentModal: React.FC<DeploymentModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'render' | 'mysql' | 'vps' | 'cpanel'>('render');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Despliegue en Render (dashboard.render.com)</h2>
              <p className="text-xs text-emerald-100">Pasos exactos y configuraciones para subir AdoptaFeliz a Render</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 gap-2 pt-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('render')}
            className={`flex items-center gap-2 px-4 py-3 font-bold text-sm rounded-t-xl transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'render'
                ? 'bg-white text-emerald-700 border-emerald-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            <Globe className="w-4 h-4 text-emerald-600" />
            1. Desplegar en Render.com ⭐
          </button>
          <button
            onClick={() => setActiveTab('mysql')}
            className={`flex items-center gap-2 px-4 py-3 font-semibold text-sm rounded-t-xl transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'mysql'
                ? 'bg-white text-emerald-700 border-emerald-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            <Database className="w-4 h-4 text-amber-600" />
            2. Base de Datos MySQL
          </button>
          <button
            onClick={() => setActiveTab('vps')}
            className={`flex items-center gap-2 px-4 py-3 font-semibold text-sm rounded-t-xl transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'vps'
                ? 'bg-white text-emerald-700 border-emerald-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            <Terminal className="w-4 h-4 text-indigo-600" />
            3. Servidor VPS (Nginx)
          </button>
          <button
            onClick={() => setActiveTab('cpanel')}
            className={`flex items-center gap-2 px-4 py-3 font-semibold text-sm rounded-t-xl transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'cpanel'
                ? 'bg-white text-emerald-700 border-emerald-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            <Cpu className="w-4 h-4 text-cyan-600" />
            4. Hosting cPanel
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 leading-relaxed text-sm">
          
          {/* TAB 1: RENDER.COM */}
          {activeTab === 'render' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-bold text-emerald-950 text-base">Despliegue Directo en Render.com</h4>
                    <p className="text-emerald-800 text-xs mt-0.5">
                      Render compila el frontend de Vite, levanta el backend Express con tu base de datos y te proporciona un dominio con certificado SSL gratuito (HTTPS).
                    </p>
                  </div>
                </div>
                <a
                  href="https://dashboard.render.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
                >
                  <span>Abrir Render Dashboard</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Paso 1: Subir código a GitHub */}
              <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">1</span>
                    Subir tu código a un repositorio en GitHub o GitLab
                  </h3>
                  <button
                    onClick={() => handleCopy('git init\ngit add .\ngit commit -m "AdoptaFeliz plataforma lista para producción"\ngit branch -M main\ngit remote add origin https://github.com/tu-usuario/adoptafeliz.git\ngit push -u origin main', 'git1')}
                    className="flex items-center gap-1 text-xs text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 cursor-pointer"
                  >
                    {copiedCode === 'git1' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedCode === 'git1' ? 'Copiado' : 'Copiar'}
                  </button>
                </div>
                <p className="text-xs text-slate-600">
                  Abre la terminal en tu computadora dentro de la carpeta del proyecto y ejecuta:
                </p>
                <pre className="bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-xs overflow-x-auto">
{`git init
git add .
git commit -m "AdoptaFeliz plataforma lista para producción"
git branch -M main
git remote add origin https://github.com/tu-usuario/adoptafeliz.git
git push -u origin main`}
                </pre>
              </div>

              {/* Paso 2: Crear el Web Service en Render */}
              <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-2xs space-y-3">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">2</span>
                  Crear el servicio en <span className="font-mono text-emerald-700">dashboard.render.com</span>
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-xs text-slate-700">
                  <li>Inicia sesión en <a href="https://dashboard.render.com/" target="_blank" rel="noreferrer" className="text-emerald-700 font-semibold underline">dashboard.render.com</a> con tu cuenta de GitHub o correo.</li>
                  <li>Haz clic en el botón superior derecho <strong>"New +"</strong> y selecciona <strong>"Web Service"</strong>.</li>
                  <li>Selecciona la opción <strong>"Build and deploy from a Git repository"</strong> y presiona <strong>Next</strong>.</li>
                  <li>Busca tu repositorio (ej. <code className="font-mono bg-slate-100 px-1">adoptafeliz</code>) y haz clic en <strong>"Connect"</strong>.</li>
                </ol>
              </div>

              {/* Paso 3: Configurar los campos exactos en Render */}
              <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-2xs space-y-4">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">3</span>
                  Campos exactos a llenar en el formulario de Render
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-500 font-semibold block mb-0.5">Name (Nombre del Servicio):</span>
                    <span className="font-mono font-bold text-slate-900">adoptafeliz-web</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-500 font-semibold block mb-0.5">Region:</span>
                    <span className="font-medium text-slate-900">Oregon (US West) o Frankfurt (EU)</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-500 font-semibold block mb-0.5">Branch (Rama):</span>
                    <span className="font-mono font-bold text-slate-900">main</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-500 font-semibold block mb-0.5">Runtime:</span>
                    <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Node</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 md:col-span-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-500 font-semibold">Build Command:</span>
                      <button
                        onClick={() => handleCopy('npm install && npm run build', 'bcmd')}
                        className="text-[11px] text-emerald-700 font-bold hover:underline cursor-pointer"
                      >
                        {copiedCode === 'bcmd' ? '¡Copiado!' : 'Copiar'}
                      </button>
                    </div>
                    <code className="font-mono font-bold text-emerald-800 bg-white px-2 py-1 rounded block border border-emerald-200">
                      npm install && npm run build
                    </code>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 md:col-span-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-500 font-semibold">Start Command:</span>
                      <button
                        onClick={() => handleCopy('npm start', 'scmd')}
                        className="text-[11px] text-emerald-700 font-bold hover:underline cursor-pointer"
                      >
                        {copiedCode === 'scmd' ? '¡Copiado!' : 'Copiar'}
                      </button>
                    </div>
                    <code className="font-mono font-bold text-emerald-800 bg-white px-2 py-1 rounded block border border-emerald-200">
                      npm start
                    </code>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 md:col-span-2">
                    <span className="text-slate-500 font-semibold block mb-0.5">Instance Type:</span>
                    <span className="font-bold text-slate-800">Free ($0/month)</span>
                  </div>
                </div>
              </div>

              {/* Paso 4: Variables de entorno en Render */}
              <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-2xs space-y-3">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">4</span>
                  Pestaña "Environment Variables" en Render
                </h3>
                <p className="text-xs text-slate-600">
                  En la sección <strong>Environment</strong> de Render, añade estas variables clave-valor:
                </p>
                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-800">NODE_ENV</span>
                    <span className="text-emerald-700 font-semibold">production</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-800">PORT</span>
                    <span className="text-emerald-700 font-semibold">10000</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 italic">
                  * Si vas a conectar una base de datos MySQL en la nube (Aiven, PlanetScale, Clever Cloud o Railway), también puedes añadir <code className="bg-slate-100 px-1 font-mono">DB_HOST</code>, <code className="bg-slate-100 px-1 font-mono">DB_USER</code>, <code className="bg-slate-100 px-1 font-mono">DB_PASSWORD</code> y <code className="bg-slate-100 px-1 font-mono">DB_NAME</code>. Si no las agregas, la app funciona inmediatamente con la base de datos persistente integrada.
                </p>
              </div>

              {/* Paso 5: Desplegar */}
              <div className="bg-emerald-600 text-white rounded-2xl p-5 shadow-lg flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-base text-white">¡Listo! Haz clic en "Deploy Web Service"</h4>
                  <p className="text-xs text-emerald-100 mt-1">
                    Render compilará tu aplicación y en menos de 2 minutos obtendrás tu URL pública como <code className="bg-white/20 px-1.5 py-0.5 rounded font-mono">https://adoptafeliz-web.onrender.com</code> con certificado HTTPS activado.
                  </p>
                </div>
                <a
                  href="https://dashboard.render.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-white text-emerald-800 font-bold text-xs rounded-xl shadow-md hover:bg-emerald-50 transition-all shrink-0 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Ir a Render</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}

          {/* TAB 2: MySQL / phpMyAdmin */}
          {activeTab === 'mysql' && (
            <div className="space-y-6">
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
                <Database className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-amber-900">Importación del Archivo SQL a la Base de Datos</h4>
                  <p className="text-amber-800 text-xs mt-1">
                    Tu archivo <code className="font-mono font-bold bg-amber-100 px-1 py-0.5 rounded">adoptafelizdb__2__0d2b1f1f.sql</code> incluye las tablas <code className="font-mono bg-amber-100 px-1 rounded">usuarios</code> y <code className="font-mono bg-amber-100 px-1 rounded">pagos</code> con los datos existentes.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Method A: phpMyAdmin */}
                <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-2xs space-y-3">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <span className="p-1.5 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold">A</span>
                    Vía phpMyAdmin (Gráfico)
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-xs text-slate-600">
                    <li>Abre <strong>phpMyAdmin</strong> en tu panel de control de hosting o localhost.</li>
                    <li>Haz clic en <strong>Nueva</strong> y crea una base de datos llamada: <code className="font-mono font-bold text-slate-800">adoptafelizdb</code> con cotejamiento <code className="font-mono text-slate-800">utf8mb4_general_ci</code>.</li>
                    <li>Selecciona la base de datos recién creada en la barra lateral izquierda.</li>
                    <li>Ve a la pestaña superior <strong>"Importar"</strong>.</li>
                    <li>Haz clic en <strong>"Seleccionar archivo"</strong> y elige <code className="font-mono text-slate-800">adoptafelizdb.sql</code>.</li>
                    <li>Presiona el botón <strong>"Continuar"</strong> o <strong>"Importar"</strong>. Verás el mensaje verde de éxito confirmando la creación de tablas y filas.</li>
                  </ol>
                </div>

                {/* Method B: Terminal */}
                <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-2xs space-y-3">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <span className="p-1.5 bg-purple-100 text-purple-700 rounded-lg text-xs font-bold">B</span>
                    Vía Consola SSH / Terminal
                  </h3>
                  <p className="text-xs text-slate-600">Si estás en un servidor Linux por consola:</p>
                  <pre className="bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-xs overflow-x-auto">
{`# 1. Crear la base de datos
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS adoptafelizdb CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;"

# 2. Importar el archivo SQL
mysql -u root -p adoptafelizdb < adoptafelizdb.sql`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: VPS Ubuntu */}
          {activeTab === 'vps' && (
            <div className="space-y-4">
              <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 flex items-start gap-3">
                <Terminal className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-indigo-900">Para Servidores VPS Propios (DigitalOcean, Hetzner, AWS)</h4>
                  <p className="text-indigo-800 text-xs mt-1">
                    Si cuentas con tu propio servidor VPS con Linux Ubuntu o Debian.
                  </p>
                </div>
              </div>

              <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto">
{`# 1. Instalar Node.js 20+, Nginx y PM2
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx git
sudo npm install -g pm2

# 2. Clonar y compilar
cd /var/www
git clone <tu-repo> adoptafeliz
cd adoptafeliz
npm install
npm run build

# 3. Iniciar con PM2
pm2 start "NODE_ENV=production npx tsx server.ts" --name adoptafeliz
pm2 save
pm2 startup`}
              </pre>
            </div>
          )}

          {/* TAB 4: cPanel */}
          {activeTab === 'cpanel' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3">
                <Cpu className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-900">Hosting cPanel (Hostinger, Banahosting)</h4>
                  <p className="text-blue-800 text-xs mt-1">
                    Configuración a través de la herramienta "Setup Node.js App".
                  </p>
                </div>
              </div>

              <ol className="list-decimal list-inside space-y-2 text-xs text-slate-600 bg-white p-4 rounded-2xl border border-slate-200">
                <li>Sube el archivo .ZIP de la aplicación (sin <code className="font-mono text-rose-600">node_modules</code>) mediante el Administrador de Archivos.</li>
                <li>Entra en <strong>Setup Node.js App</strong> en cPanel.</li>
                <li>Application startup file: <code className="font-mono bg-slate-100 px-1">server.ts</code></li>
                <li>Node.js version: <strong>20.x o superior</strong>.</li>
                <li>Pulsa <strong>Create</strong> y después ejecuta <code className="font-mono bg-slate-100 px-1">npm install && npm run build</code>.</li>
              </ol>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Render Blueprint (<code className="font-mono text-slate-800">render.yaml</code>) incluido en la raíz de tu proyecto.
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs rounded-xl transition-all shadow-sm shadow-emerald-600/30 cursor-pointer"
          >
            Cerrar Guía
          </button>
        </div>

      </div>
    </div>
  );
};
