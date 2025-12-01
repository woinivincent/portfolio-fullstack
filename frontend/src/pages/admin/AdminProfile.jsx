import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { IoSave, IoPerson, IoMail, IoLocation, IoLogoGithub, IoLogoLinkedin, IoCloudUpload, IoTrash } from 'react-icons/io5';
import toast from 'react-hot-toast';
import portfolioService from '../../services/portfolioService';
import adminService from '../../services/adminService';
import { Button, Input, Loading } from '../../components/common';

const AdminProfile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    subtitle: '',
    bio: '',
    description: '',
    profileImage: '',
    cvUrl: '',
    location: '',
    socialLinks: {
      linkedin: '',
      github: '',
      whatsapp: '',
      email: '',
      twitter: ''
    },
    stats: {
      yearsExperience: 0,
      projectsCompleted: 0,
      certifications: 0
    }
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await portfolioService.getProfile();
      if (data) {
        setFormData({
          name: data.name || '',
          title: data.title || '',
          subtitle: data.subtitle || '',
          bio: data.bio || '',
          description: data.description || '',
          profileImage: data.profileImage || '',
          cvUrl: data.cvUrl || '',
          location: data.location || '',
          socialLinks: {
            linkedin: data.socialLinks?.linkedin || '',
            github: data.socialLinks?.github || '',
            whatsapp: data.socialLinks?.whatsapp || '',
            email: data.socialLinks?.email || '',
            twitter: data.socialLinks?.twitter || ''
          },
          stats: {
            yearsExperience: data.stats?.yearsExperience || 0,
            projectsCompleted: data.stats?.projectsCompleted || 0,
            certifications: data.stats?.certifications || 0
          }
        });
        setImagePreview(data.profileImage || '');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Error al cargar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: parent === 'stats' ? Number(value) : value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Función para comprimir imagen
  const compressImage = (file, maxWidth = 800, quality = 0.8) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const img = new Image();
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Redimensionar manteniendo aspecto
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Convertir a Base64 con compresión
          canvas.toBlob(
            (blob) => {
              const compressedReader = new FileReader();
              compressedReader.onload = () => resolve(compressedReader.result);
              compressedReader.onerror = reject;
              compressedReader.readAsDataURL(blob);
            },
            'image/jpeg',
            quality
          );
        };

        img.onerror = reject;
        img.src = e.target.result;
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      toast.error('Por favor selecciona un archivo de imagen válido');
      return;
    }

    // Validar tamaño (máximo 5MB antes de comprimir)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('La imagen debe ser menor a 5MB');
      return;
    }

    setUploading(true);

    try {
      // Comprimir imagen
      const compressedBase64 = await compressImage(file);
      
      // Verificar tamaño después de compresión
      const sizeInKB = Math.round((compressedBase64.length * 3) / 4 / 1024);
      console.log(`Tamaño de imagen comprimida: ${sizeInKB}KB`);

      if (sizeInKB > 500) {
        // Si aún es muy grande, comprimir más
        const moreCompressed = await compressImage(file, 600, 0.6);
        setFormData({
          ...formData,
          profileImage: moreCompressed
        });
        setImagePreview(moreCompressed);
      } else {
        setFormData({
          ...formData,
          profileImage: compressedBase64
        });
        setImagePreview(compressedBase64);
      }

      toast.success('Imagen cargada y optimizada correctamente');
    } catch (error) {
      console.error('Error compressing image:', error);
      toast.error('Error al procesar la imagen');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      profileImage: ''
    });
    setImagePreview('');
    toast.success('Imagen eliminada');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Verificar tamaño del payload
      const payloadSize = JSON.stringify(formData).length;
      const sizeInKB = Math.round(payloadSize / 1024);
      console.log(`Tamaño total del payload: ${sizeInKB}KB`);

      if (sizeInKB > 15000) {
        toast.error('El perfil es muy grande. Por favor usa una imagen más pequeña.');
        setSaving(false);
        return;
      }

      await adminService.updateProfile(formData);
      toast.success('Perfil actualizado correctamente');
      fetchProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Error al actualizar perfil';
      toast.error(errorMsg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loading text="Cargando perfil..." />;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Perfil</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Edita tu información personal y profesional
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <IoPerson className="w-6 h-6 text-primary-500" />
            Información Personal
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Nombre Completo"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Vicente Woinilowicz"
            />

            <Input
              label="Título Principal"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Full-Stack Developer"
            />

            <Input
              label="Subtítulo"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              placeholder="Especialista en Ciberseguridad"
              className="md:col-span-2"
            />

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Biografía Corta
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                placeholder="Breve descripción sobre ti..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Descripción Detallada
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                placeholder="Descripción más detallada de tu perfil profesional..."
              />
            </div>

            {/* Image Upload Section */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Foto de Perfil
              </label>
              
              {imagePreview ? (
                <div className="flex items-center gap-6">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-full border-4 border-primary-500"
                  />
                  <div className="space-y-2">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                      <IoCloudUpload className="w-5 h-5" />
                      Cambiar Imagen
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <IoTrash className="w-5 h-5" />
                      Eliminar
                    </button>
                  </div>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl hover:border-primary-500 dark:hover:border-primary-500 transition-colors bg-gray-50 dark:bg-gray-900">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <IoCloudUpload className="w-12 h-12 text-gray-400 mb-3" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click para subir</span> o arrastra una imagen
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG, JPG o WEBP (Se optimizará automáticamente)
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              )}

              {uploading && (
                <div className="mt-2 flex items-center gap-2 text-primary-500">
                  <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm">Optimizando imagen...</span>
                </div>
              )}
            </div>

            <Input
              label="URL CV (PDF)"
              name="cvUrl"
              value={formData.cvUrl}
              onChange={handleChange}
              placeholder="https://ejemplo.com/cv.pdf"
              className="md:col-span-2"
            />

            <Input
              label="Ubicación"
              name="location"
              value={formData.location}
              onChange={handleChange}
              icon={IoLocation}
              placeholder="Buenos Aires, Argentina"
              className="md:col-span-2"
            />
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <IoLogoGithub className="w-6 h-6 text-primary-500" />
            Redes Sociales
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="LinkedIn"
              name="socialLinks.linkedin"
              value={formData.socialLinks.linkedin}
              onChange={handleChange}
              icon={IoLogoLinkedin}
              placeholder="https://linkedin.com/in/usuario"
            />

            <Input
              label="GitHub"
              name="socialLinks.github"
              value={formData.socialLinks.github}
              onChange={handleChange}
              icon={IoLogoGithub}
              placeholder="https://github.com/usuario"
            />

            <Input
              label="WhatsApp"
              name="socialLinks.whatsapp"
              value={formData.socialLinks.whatsapp}
              onChange={handleChange}
              placeholder="https://wa.me/5491234567890"
            />

            <Input
              label="Email"
              name="socialLinks.email"
              value={formData.socialLinks.email}
              onChange={handleChange}
              type="email"
              icon={IoMail}
              placeholder="tu@email.com"
            />

            <Input
              label="Twitter/X"
              name="socialLinks.twitter"
              value={formData.socialLinks.twitter}
              onChange={handleChange}
              placeholder="https://twitter.com/usuario"
              className="md:col-span-2"
            />
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Estadísticas
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Años de Experiencia
              </label>
              <input
                type="number"
                name="stats.yearsExperience"
                value={formData.stats.yearsExperience}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Proyectos Completados
              </label>
              <input
                type="number"
                name="stats.projectsCompleted"
                value={formData.stats.projectsCompleted}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Certificaciones
              </label>
              <input
                type="number"
                name="stats.certifications"
                value={formData.stats.certifications}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </motion.div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            icon={IoSave}
            loading={saving}
            className="px-8"
          >
            Guardar Cambios
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminProfile;