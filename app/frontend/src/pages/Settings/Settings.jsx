import './Settings.css'
import Header from '../../components/Header'
import Button from '../../components/Home/Buttons/Button'
import { useEffect, useState } from 'react'

import axios from 'axios'




// const user = {
// 	firstname: 'aymene',
// 	lastname: 'haloui',
// 	email: 'test@gmail.com',
// 	phonenumber: '+212611223344',
// 	current_password: 'Aymene123',
// 	new_password: 'Aymene1234',
// 	confirm_password: 'Aymene1234',
// 	username: 'ahaloui',
// 	displayname: 'Aymene',
// 	bio: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor quam, aperiam sit ratione officiis asperiores id quisquam, fugiat ipsa sed autem.',
// 	profile_picture: './assets/images/moudrib.jpeg',
// }


function Input({ type, label, placeholder, id, value, onChange }) {
	return (
		<div className='flex flex-col'>
			<label htmlFor={id} className='font-regular text-light sections-title'>
				{label}
			</label>
			<input
				id={id}
				name={id}
				type={type}
				placeholder={placeholder}
				className='inputs border border-border rounded-lg bg-[rgb(183,170,156,8%)]
				placeholder:text-border placeholder:font-regular placeholders outline-none max-ms:w-[80%]'
				value={value}
				onChange={onChange}
			/>
		</div>
	)
}

const Settings = () => {


	const [user, setUser] = useState({});
    const [first_name, setFirstname] = useState('');
    const [last_name, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [mobile_number, setPhonenumber] = useState('');
    const [current_password, setCurrentPassword] = useState('');
    const [new_password, setNewPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [displayname, setDisplayname] = useState('');
    const [bio, setBio] = useState('');

	/* -----------------------------------------------------------------------------------  */
	window.addEventListener('load', function () {
		var resetButton = document.getElementById('resetButton')

		resetButton.addEventListener('click', function () {
			var forms = document.getElementsByTagName('form')
			for (var i = 0; i < forms.length; i++) {
				forms[i].reset()
			}
		})
	})


	function fetch_user_info() {
		axios.get('http://127.0.0.1:8000/api/profiles/1/ ')
		.then((response) => {
			setUser(response.data)
		})
		.catch((error) => {
			console.log(error)
		})
	}

	useEffect(() => {
		fetch_user_info()
	}, [])

	useEffect(() => {
        if (user) {
            setFirstname(user.first_name || '');
            setLastname(user.last_name || '');
            setEmail(user.email || '');
            setPhonenumber(user.mobile_number || '');
            setUsername(user.username || '');
            setDisplayname(user.displayname || '');
            setBio(user.bio || '');
        }
    }, [user]);

	function update_user_info() {
		const userProfileData = {
			first_name: first_name,
			last_name: last_name,
			email: email,
			mobile_number: mobile_number,
			// current_password: current_password,
			// new_password: new_password,
			// confirm_password: confirm_password,
			username: username,
			displayname: displayname,
			bio: bio
		}

		axios.put('http://127.0.0.1:8000/api/profiles/update/1/', userProfileData,)
		.then((response) => {
			console.log(response.data)
		})
		.catch((error) => {
			if (error.response && error.response.data) {
				// Extract error data from response
				const errorData = error.response.data;
	
				// Construct error message
				let errorMessage = '';
				for (const [field, messages] of Object.entries(errorData)) {
					errorMessage += `${field}: ${messages.join(', ')}\n`;
				}
	
				// Alert the error message
				alert(errorMessage);
			} else {
				// Handle other types of errors (network issues, etc.)
				alert('An unexpected error occurred.');
			}});
	}


	function saveChanges() {
	
		update_user_info()
	}

	/* -----------------------------------------------------------------------------------  */

	return (
		<div className='min-h-screen backdrop-blur-sm bg-backdrop-40 text-primary'>
			<Header />
			<section className='flex justify-center'>
				<div className='settings max-tb:h-auto card-margin w-full lg:border-2 border border-primary rounded-3xl'>
					<div className='flex items-center card-header sections-ml'>
						<h1 className='font-dreamscape-sans text-primary leading-[1]'>settings</h1>
					</div>
					<div className='h-0.5 separators'></div>
					<div
						className='sections-ml flex tb:flex-row flex-col items-center picture-section
						xl:gap-[110px] lg:gap-[80px] tb:gap-[20px] max-tb:gap-y-3'
					>
						<div className='font-regular sections-title tb:self-center self-start'>
							<p className='text-primary'>Profile Picture</p>
							<p className='text-light'>
								Must be JPEG, PNG, or GIF and cannot exceed 5MB.
							</p>
						</div>
						<div className='flex items-center max-ms:flex-col lp:gap-14 tb:gap-8 gap-5'>
							<div>
								<img
									src= '/assets/images/moudrib.jpeg'
									className='rounded-full border border-primary profile-pic'
									alt=''
								/>
							</div>
							<div className='flex max-ms:flex-col lp:gap-2 gap-1'>
								<Button
									className={
										'rounded-md border-border font-regular buttons-text update-button'
									}
								>
									Update Profile Picture
								</Button>
								<Button
									className={
										'rounded-md border-border font-regular buttons-text remove-button'
									}
								>
									Remove
								</Button>
							</div>
						</div>
					</div>
					<div className='h-0.5 separators'></div>
					<div
						className='sections-ml flex tb:flex-row flex-col items-center picture-section
						xl:gap-[110px] lg:gap-[50px] tb:gap-[20px] max-tb:gap-y-3'
					>
						<div className='font-regular sections-title tb:self-center self-start'>
							<p className='text-primary'>Personal Settings</p>
							<p className='text-light'>
								Change identifying details for your account.
							</p>
						</div>
							
						<div className='flex items-center'>

							
							<form id='form1' className='flex flex-col lp:gap-4 gap-2'>
								<div className='flex flex-wrap xl:gap-12 lg:gap-4 gap-2'>
									<Input
										id={'firstname'}
										type={'text'}
										label={'First Name'}
										placeholder={'Mouad'}
										value= {first_name}
										onChange={(e) => setFirstname(e.target.value)}
									/>
									<Input
										id={'lastname'}
										type={'text'}
										label={'Last Name'}
										placeholder={'Oudrib'}
										value= {last_name}
										onChange={(e) => setLastname(e.target.value)}
									/>
								</div>
								<div className='flex flex-wrap xl:gap-12 lg:gap-4 gap-2'>
									<Input
										id={'email'}
										type={'email'}
										label={'Email'}
										placeholder={'transcendence@gmail.com'}
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
									<Input
										id={'phonenumber'}
										type={'text'}
										label={'Phone Number'}
										placeholder={'+212611223344'}
										value={mobile_number}
										onChange={(e) => setPhonenumber(e.target.value)}
									/>
								</div>
								<div className='flex flex-wrap xl:gap-12 lg:gap-4 gap-2'>
									<Input
										id={'password'}
										type={'password'}
										label={'Current Password'}
										placeholder={'•••••••••••••'}
										value={current_password}
										onChange={(e) => setCurrentPassword(e.target.value)}
									/>
									<Input
										id={'newpassword'}
										type={'password'}
										label={'New Password'}
										placeholder={'••••••••••'}
										value={new_password}
										onChange={(e) => setNewPassword(e.target.value)}
									/>
									<Input
										id={'confirmpassword'}
										type={'password'}
										label={'Confirm New Password'}
										placeholder={'••••••••••'}
										value={confirm_password}
										onChange={(e) => setConfirmPassword(e.target.value)}
									/>
								</div>
							

							</form>
						</div>
					</div>
					<div className='h-0.5 separators'></div>
					<div
						className='sections-ml flex tb:flex-row flex-col items-center picture-section
						gap-5 max-tb:gap-y-3'
					>
						<div className='font-regular sections-title tb:self-center self-start'>
							<p className='text-primary'>Profile Settings</p>
						</div>
						<div className='flex items-center'>


							<form id='form2' className='flex flex-col lp:gap-4 gap-2'>
								<div className='flex flex-wrap xl:gap-12 lg:gap-4 gap-2'>
									<div className='flex flex-col gap-3'>
										<Input
											id={'username'}
											type={'text'}
											label={'Username'}
											placeholder={'mouad55'}
											value={username}
											onChange={(e) => setUsername(e.target.value)}
										/>
										<Input
											id={'displayname'}
											type={'text'}
											label={'Display Name'}
											placeholder={'Arobase'}
											value={displayname}
											onChange={(e) => setDisplayname(e.target.value)}
										/>
									</div>
									<div className='flex flex-col'>
										<label
											htmlFor=''
											className='font-regular text-light sections-title'
										>
											Bio
										</label>
										<textarea
											name=''
											id=''
											placeholder={
												'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor quam, aperiam sit ratione officiis asperiores id quisquam, fugiat ipsa sed autem.'
											}
											maxLength={'250'}
											className='bio-input font-regular border border-border rounded-lg bg-[rgb(183,170,156,8%)]
											max-ms:w-full outline-none placeholders placeholder:text-border'
											value={bio}
											onChange={(e) => setBio(e.target.value)}
										></textarea>
									</div>
								</div>
							</form>


						</div>
					</div>
					<div className='flex justify-end save-button my-3 tb:gap-2 gap-1'>
						<Button
							id={'resetButton'}
							className={
								'rounded-md border-border font-regular buttons-text remove-button'
							}
						>
							Cancel
						</Button>
						<Button
							className={
								'rounded-md border-border font-regular buttons-text remove-button'
							}
							type='submit'
							onClick={saveChanges}
						>
							Save Changes
						</Button>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Settings
