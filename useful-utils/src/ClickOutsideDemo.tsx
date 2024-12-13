import styles from './Header.module.css'
import { useState, useRef } from 'react'
import { useClickOutside } from './utils/useClickOutside'

interface HeaderProps {
  showProfile? : boolean
}

const UserProfile = () => {
  return <></>
}

const ProfileDropdown = () => {
  return <></>
}

const Header = ({showProfile = true}: HeaderProps) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userProfileCardRef = useRef<HTMLDivElement>(null);

  const toggleProfileCard = () => {
    setShowProfileDropdown(!showProfileDropdown)
  }

  // Allow profile dropdown to close when clicked off of.
  useClickOutside(dropdownRef, () => setShowProfileDropdown(false), showProfileDropdown, userProfileCardRef);

  return (
    <>
      <div className={styles.header}>
        {showProfile ? (
          <div ref={userProfileCardRef} className={styles.userProfile} onClick={toggleProfileCard}>
            <UserProfile />
          </div>
        ) : (
          <div className={styles.placeholder}>
            
          </div>
        )}
      </div>
      
      {showProfileDropdown ? (
          <div ref={dropdownRef} className={styles.userProfile}>
            <ProfileDropdown/>
          </div>
        ) : (
          <div className={styles.placeholder}>
            
          </div>
        )}
    </>
  )
}

export default Header