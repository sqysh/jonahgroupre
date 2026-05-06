'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  User,
  Mail,
  Phone,
  Monitor,
  Clock,
  CheckCircle,
  Circle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Save,
  LogOut,
  Home,
  LayoutGrid,
  UserPlus,
  Users,
  Loader2,
  Trash2
} from 'lucide-react'
import { signOut } from 'next-auth/react'
import { IContactSubmission } from '@/app/types/contact-submission.types'
import { updateUserName } from '@/app/lib/actions/user/updateUserName'
import { updateSubmissionStatus } from '@/app/lib/actions/contact-submission/updateContactSubmission'
import Link from 'next/link'
import { createAdminUser } from '@/app/lib/actions/user/createAdminUser'
import { deleteUser } from '@/app/lib/actions/user/deleteUser'
import { deleteContactSubmission } from '@/app/lib/actions/contact-submission/deleteContactSubmission'

interface PortalClientProps {
  user: {
    id: string
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    role: string
  }
  submissions: IContactSubmission[]
  users: {
    id: string
    firstName: string | null
    lastName: string | null
    email: string | null
    role: string
    createdAt: Date
  }[]
}

export default function PortalClient({ user, submissions, users }: PortalClientProps) {
  const router = useRouter()
  const [firstName, setFirstName] = useState(user.firstName ?? '')
  const [lastName, setLastName] = useState(user.lastName ?? '')
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [statuses, setStatuses] = useState<Record<string, string>>(
    Object.fromEntries(submissions.map((s) => [s.id, s.status]))
  )
  const [adminForm, setAdminForm] = useState({ email: '', firstName: '', lastName: '' })
  const [adminSaving, setAdminSaving] = useState(false)
  const [adminMsg, setAdminMsg] = useState<string | null>(null)
  const [adminError, setAdminError] = useState<string | null>(null)

  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const [deletingSubmissionId, setDeletingSubmissionId] = useState<string | null>(null)

  const handleDeleteSubmission = async (id: string) => {
    setDeletingSubmissionId(id)
    const result = await deleteContactSubmission(id)
    if (result.success) {
      router.refresh()
    }
    setDeletingSubmissionId(null)
  }

  const handleAdminInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAdminForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleCreateAdmin = async () => {
    if (!adminForm.email || !adminForm.firstName || !adminForm.lastName) {
      setAdminError('All fields are required.')
      return
    }
    setAdminSaving(true)
    setAdminError(null)
    setAdminMsg(null)

    const result = await createAdminUser(adminForm.email, adminForm.firstName, adminForm.lastName)

    if (result.success) {
      router.refresh()
      setAdminMsg('Admin user created.')
      setAdminForm({ email: '', firstName: '', lastName: '' })
    } else {
      setAdminError(result.error ?? 'Failed to create user.')
    }
    setAdminSaving(false)
    setTimeout(() => {
      setAdminMsg(null)
      setAdminError(null)
    }, 4000)
  }

  const handleDeleteUser = async (userId: string) => {
    setDeletingId(userId)
    setDeleteError(null)
    const result = await deleteUser(userId)
    if (result.success) {
      router.refresh()
    } else {
      setDeleteError(result.error ?? 'Failed to delete user.')
      setTimeout(() => setDeleteError(null), 4000)
    }
    setDeletingId(null)
  }

  const handleSaveProfile = async () => {
    setSaving(true)
    const result = await updateUserName(firstName, lastName)
    if (result.success) {
      setSaveMsg('Saved!')
      router.refresh()
    } else {
      setSaveMsg('Failed to save.')
    }
    setSaving(false)
    setTimeout(() => setSaveMsg(null), 3000)
  }

  const handleStatusChange = async (id: string, status: string) => {
    setStatuses((prev) => ({ ...prev, [id]: status }))
    await updateSubmissionStatus(id, status)
    router.refresh()
  }

  const statusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <Circle className="w-3.5 h-3.5 text-primary-light dark:text-primary-dark" />
      case 'contacted':
        return <CheckCircle className="w-3.5 h-3.5 text-blue-500" />
      case 'closed':
        return <XCircle className="w-3.5 h-3.5 text-muted-light dark:text-muted-dark" />
      default:
        return null
    }
  }

  const statusLabel: Record<string, string> = {
    new: 'New',
    contacted: 'Contacted',
    closed: 'Closed'
  }

  const newCount = submissions.filter((s) => s.status === 'new').length

  return (
    <main className="min-h-screen bg-bg-light dark:bg-bg-dark px-4 py-10 sm:py-14">
      <div className="w-full max-w-170 mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold uppercase text-text-light dark:text-text-dark tracking-tight">
              Portal
            </h1>
            <p className="text-xs text-muted-light dark:text-muted-dark mt-0.5">{user.email}</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              aria-label="Go to homepage"
              className="text-xs uppercase font-semibold text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark rounded"
            >
              <Home className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/listings"
              aria-label="View listings"
              className="text-xs uppercase font-semibold text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark rounded"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              aria-label="Sign out"
              className="flex items-center gap-1.5 text-xs uppercase font-semibold text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark rounded"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
        {/* Accent line */}
        <div className="w-10 h-1 bg-primary-light dark:bg-primary-dark" aria-hidden="true" />
        {/* Profile Card */}
        <section
          aria-labelledby="profile-heading"
          className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-5 sm:p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <User
              className="w-4 h-4 text-primary-light dark:text-primary-dark"
              aria-hidden="true"
            />
            <h2
              id="profile-heading"
              className="text-sm font-bold uppercase text-text-light dark:text-text-dark tracking-wide"
            >
              Profile
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="firstName"
                  className="text-xs uppercase font-semibold text-muted-light dark:text-muted-dark"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark px-3 py-2.5 text-sm text-text-light dark:text-text-dark placeholder:text-muted-light dark:placeholder:text-muted-dark focus:border-primary-light dark:focus:border-primary-dark focus:outline-none transition-colors duration-200"
                  placeholder="First name"
                  aria-label="First name"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="lastName"
                  className="text-xs uppercase font-semibold text-muted-light dark:text-muted-dark"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark px-3 py-2.5 text-sm text-text-light dark:text-text-dark placeholder:text-muted-light dark:placeholder:text-muted-dark focus:border-primary-light dark:focus:border-primary-dark focus:outline-none transition-colors duration-200"
                  placeholder="Last name"
                  aria-label="Last name"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              {saveMsg ? (
                <p
                  className={`text-xs font-medium ${saveMsg === 'Saved!' ? 'text-primary-light dark:text-primary-dark' : 'text-red-500'}`}
                >
                  {saveMsg}
                </p>
              ) : (
                <span />
              )}
              <button
                onClick={handleSaveProfile}
                disabled={saving}
                aria-label="Save profile"
                className="flex items-center gap-2 px-5 py-2.5 bg-primary-light dark:bg-primary-dark text-white dark:text-bg-dark text-xs font-bold uppercase hover:bg-button-light dark:hover:bg-button-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" aria-hidden="true" />
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </section>

        {/* Submissions */}
        <section aria-labelledby="submissions-heading">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Mail
                className="w-4 h-4 text-primary-light dark:text-primary-dark"
                aria-hidden="true"
              />
              <h2
                id="submissions-heading"
                className="text-sm font-bold uppercase text-text-light dark:text-text-dark tracking-wide"
              >
                Contact Submissions
              </h2>
            </div>
            {newCount > 0 && (
              <span className="bg-primary-light dark:bg-primary-dark text-white dark:text-bg-dark text-xs font-bold px-2 py-0.5">
                {newCount} New
              </span>
            )}
          </div>

          {submissions.length === 0 ? (
            <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-8 text-center">
              <p className="text-muted-light dark:text-muted-dark text-sm">No submissions yet.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {submissions.map((sub) => {
                const isOpen = expandedId === sub.id
                const status = statuses[sub.id]

                return (
                  <div
                    key={sub.id}
                    className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark"
                  >
                    {/* Row */}
                    <button
                      onClick={() => setExpandedId(isOpen ? null : sub.id)}
                      aria-expanded={isOpen}
                      aria-controls={`submission-${sub.id}`}
                      className="w-full flex items-center justify-between px-4 py-3.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {statusIcon(status)}
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-text-light dark:text-text-dark truncate">
                            {sub.firstName} {sub.lastName}
                          </p>
                          <p className="text-xs text-muted-light dark:text-muted-dark truncate">
                            {sub.subject}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0 ml-3">
                        <span className="text-xs text-muted-light dark:text-muted-dark hidden sm:block">
                          {new Date(sub.createdAt).toLocaleDateString()}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-muted-light dark:text-muted-dark" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted-light dark:text-muted-dark" />
                        )}
                      </div>
                    </button>

                    {/* Expanded */}
                    {isOpen && (
                      <div
                        id={`submission-${sub.id}`}
                        className="border-t border-border-light dark:border-border-dark px-4 py-4 flex flex-col gap-4"
                      >
                        {/* Meta */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {sub.email && (
                            <a
                              href={`mailto:${sub.email}`}
                              className="flex items-center gap-2 text-xs text-text2-light dark:text-text2-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors"
                            >
                              <Mail className="w-3.5 h-3.5 shrink-0" />
                              {sub.email}
                            </a>
                          )}
                          {sub.phoneNumber && (
                            <a
                              href={`tel:${sub.phoneNumber}`}
                              className="flex items-center gap-2 text-xs text-text2-light dark:text-text2-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors"
                            >
                              <Phone className="w-3.5 h-3.5 shrink-0" />
                              {sub.phoneNumber}
                            </a>
                          )}
                          {sub.propertyType && (
                            <div className="flex items-center gap-2 text-xs text-text2-light dark:text-text2-dark">
                              <Monitor className="w-3.5 h-3.5 shrink-0" />
                              {sub.propertyType}
                            </div>
                          )}
                          {sub.timeframe && (
                            <div className="flex items-center gap-2 text-xs text-text2-light dark:text-text2-dark">
                              <Clock className="w-3.5 h-3.5 shrink-0" />
                              {sub.timeframe}
                            </div>
                          )}
                        </div>

                        {/* Price Range */}
                        {sub.priceRange && (
                          <p className="text-xs text-muted-light dark:text-muted-dark">
                            Budget:{' '}
                            <span className="text-text-light dark:text-text-dark font-medium">
                              {sub.priceRange}
                            </span>
                          </p>
                        )}

                        {/* Message */}
                        <p className="text-sm text-text-light dark:text-text-dark leading-relaxed bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark p-3">
                          {sub.message}
                        </p>

                        {/* Date + Status + Delete */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <p className="text-xs text-muted-light dark:text-muted-dark">
                            {new Date(sub.createdAt).toLocaleDateString('en-US', {
                              weekday: 'short',
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>

                          <div className="flex items-center gap-3">
                            {/* Status Selector */}
                            <div
                              className="flex items-center gap-2"
                              role="group"
                              aria-label="Update submission status"
                            >
                              {['new', 'contacted', 'closed'].map((s) => (
                                <button
                                  key={s}
                                  onClick={() => handleStatusChange(sub.id, s)}
                                  aria-pressed={status === s}
                                  className={`text-xs px-3 py-1.5 font-semibold uppercase transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark ${
                                    status === s
                                      ? 'bg-primary-light dark:bg-primary-dark text-white dark:text-bg-dark'
                                      : 'bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark text-muted-light dark:text-muted-dark hover:border-primary-light dark:hover:border-primary-dark hover:text-primary-light dark:hover:text-primary-dark'
                                  }`}
                                >
                                  {statusLabel[s]}
                                </button>
                              ))}
                            </div>

                            {/* Delete */}
                            <button
                              onClick={() => handleDeleteSubmission(sub.id)}
                              disabled={deletingSubmissionId === sub.id}
                              aria-label={`Delete submission from ${sub.firstName} ${sub.lastName}`}
                              className="text-muted-light dark:text-muted-dark hover:text-red-500 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded disabled:opacity-50"
                            >
                              {deletingSubmissionId === sub.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </section>

        {/* Users List */}
        <section
          aria-labelledby="users-heading"
          className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-5 sm:p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <Users
              className="w-4 h-4 text-primary-light dark:text-primary-dark"
              aria-hidden="true"
            />
            <h2
              id="users-heading"
              className="text-sm font-bold uppercase text-text-light dark:text-text-dark tracking-wide"
            >
              Users
            </h2>
          </div>

          {deleteError && (
            <p role="alert" className="text-xs text-red-500 font-medium mb-4">
              {deleteError}
            </p>
          )}

          {users.length === 0 ? (
            <p className="text-xs text-muted-light dark:text-muted-dark">No users found.</p>
          ) : (
            <div className="flex flex-col divide-y divide-border-light dark:divide-border-dark">
              {users.map((u) => (
                <div key={u.id} className="flex items-center justify-between py-3 gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-text-light dark:text-text-dark truncate">
                      {u.firstName} {u.lastName}
                      {u.id === user.id && (
                        <span className="ml-2 text-xs text-muted-light dark:text-muted-dark font-normal">
                          (you)
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-muted-light dark:text-muted-dark truncate">
                      {u.email}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`text-xs font-semibold uppercase px-2 py-0.5 ${
                        u.role === 'SUPER_USER'
                          ? 'bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark'
                          : 'bg-surface2-light dark:bg-surface2-dark text-muted-light dark:text-muted-dark'
                      }`}
                    >
                      {u.role === 'SUPER_USER' ? 'Super' : 'Admin'}
                    </span>

                    {u.id !== user.id && user.role === 'SUPER_USER' && (
                      <button
                        onClick={() => handleDeleteUser(u.id)}
                        disabled={deletingId === u.id}
                        aria-label={`Delete ${u.firstName} ${u.lastName}`}
                        className="text-muted-light dark:text-muted-dark hover:text-red-500 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded disabled:opacity-50"
                      >
                        {deletingId === u.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Admin User */}
        <section
          aria-labelledby="create-admin-heading"
          className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-5 sm:p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <UserPlus
              className="w-4 h-4 text-primary-light dark:text-primary-dark"
              aria-hidden="true"
            />
            <h2
              id="create-admin-heading"
              className="text-sm font-bold uppercase text-text-light dark:text-text-dark tracking-wide"
            >
              Create Admin User
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="adminFirstName"
                  className="text-xs uppercase font-semibold text-muted-light dark:text-muted-dark"
                >
                  First Name
                </label>
                <input
                  id="adminFirstName"
                  name="firstName"
                  type="text"
                  value={adminForm.firstName}
                  onChange={handleAdminInput}
                  placeholder="First name"
                  aria-label="Admin first name"
                  className="bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark px-3 py-2.5 text-sm text-text-light dark:text-text-dark placeholder:text-placeholder-light dark:placeholder:text-placeholder-dark focus:border-primary-light dark:focus:border-primary-dark focus:outline-none transition-colors duration-200"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="adminLastName"
                  className="text-xs uppercase font-semibold text-muted-light dark:text-muted-dark"
                >
                  Last Name
                </label>
                <input
                  id="adminLastName"
                  name="lastName"
                  type="text"
                  value={adminForm.lastName}
                  onChange={handleAdminInput}
                  placeholder="Last name"
                  aria-label="Admin last name"
                  className="bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark px-3 py-2.5 text-sm text-text-light dark:text-text-dark placeholder:text-placeholder-light dark:placeholder:text-placeholder-dark focus:border-primary-light dark:focus:border-primary-dark focus:outline-none transition-colors duration-200"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="adminEmail"
                className="text-xs uppercase font-semibold text-muted-light dark:text-muted-dark"
              >
                Email Address
              </label>
              <input
                id="adminEmail"
                name="email"
                type="email"
                value={adminForm.email}
                onChange={handleAdminInput}
                placeholder="email@example.com"
                aria-label="Admin email address"
                className="bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark px-3 py-2.5 text-sm text-text-light dark:text-text-dark placeholder:text-placeholder-light dark:placeholder:text-placeholder-dark focus:border-primary-light dark:focus:border-primary-dark focus:outline-none transition-colors duration-200"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              {adminError && (
                <p role="alert" className="text-xs text-red-500 font-medium">
                  {adminError}
                </p>
              )}
              {adminMsg && (
                <p className="text-xs text-primary-light dark:text-primary-dark font-medium">
                  {adminMsg}
                </p>
              )}
              {!adminError && !adminMsg && <span />}

              <button
                onClick={handleCreateAdmin}
                disabled={adminSaving}
                aria-label="Create admin user"
                className="flex items-center gap-2 px-5 py-2.5 bg-primary-light dark:bg-primary-dark text-white dark:text-bg-dark text-xs font-bold uppercase hover:bg-button-light dark:hover:bg-button-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark disabled:opacity-50"
              >
                <UserPlus className="w-3.5 h-3.5" aria-hidden="true" />
                {adminSaving ? 'Creating...' : 'Create'}
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
