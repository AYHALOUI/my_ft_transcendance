import './Settings.css'
import Header from '../../components/Header'
import Button from '../../components/Home/Buttons/Button'
import { useEffect, useState } from 'react'

import axios from 'axios'



let tmp = '/profile_pictures/';

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

var defaultImagePath = "/profile_pictures/avatar.jpg";

const Settings = () => {

	const [image, setImage] = useState('');
	const [preview, setPreview] = useState('');
	const [selectedFile, setSelectedFile] = useState(null);

	const [user, setUser] = useState({});
    const [first_name, setFirstname] = useState('');
    const [last_name, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [mobile_number, setPhonenumber] = useState('');
    const [current_password, setCurrentPassword] = useState('');
    const [new_password, setNewPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [display_name, setDisplayname] = useState('');
    const [bio, setBio] = useState('');
	// const [is_imge_changed, setIsImageChanged] = useState(false);
	window.addEventListener('load', function () {
		var resetButton = document.getElementById('resetButton')

		resetButton.addEventListener('click', function () {
			var forms = document.getElementsByTagName('form')
			for (var i = 0; i < forms.length; i++) {
				forms[i].reset()
			}
		})
	})



	useEffect(() => {
			const fetchUserInfo = async () => {
				try {
					const response = await axios.get('http://127.0.0.1:8000/api/users/1/');
					setUser(response.data);
				} catch (error) {
					console.error(error);
				}
			};
			fetchUserInfo();
	}, [])

	useEffect(() => {
        if (user) {
            setFirstname(user.first_name || '');
            setLastname(user.last_name || '');
            setEmail(user.email || '');
            setPhonenumber(user.mobile_number || '');
            setUsername(user.username || '');
            setDisplayname(user.display_name || '');
            setBio(user.bio || '');
			setImage(user.profile_picture || '');
        }
    }, [user]);

	function update_user_info() {

		const userProfileData = new FormData();

		if (first_name !== user.first_name) 
		{
			userProfileData.append('first_name', first_name);
			setUser({...user, first_name: first_name});
		}
    	if (last_name !== user.last_name) 
		{
			userProfileData.append('last_name', last_name);
			setUser({...user, last_name: last_name});
		}
		if (email !== user.email)
		{
			userProfileData.append('email', email);
			setUser({...user, email: email});
		}
		if (mobile_number !== user.mobile_number)
		{
			userProfileData.append('mobile_number', mobile_number);
			setUser({...user, mobile_number: mobile_number});
		}
		if (username !== user.username)
		{
			userProfileData.append('username', username);
			setUser({...user, username: username});
		}
		if (display_name !== user.display_name)
		{
			userProfileData.append('display_name', display_name);
			setUser({...user, display_name: display_name});
		}
		if (bio !== user.bio)
		{
			userProfileData.append('bio', bio);
			setUser({...user, bio: bio});
		}
		if (selectedFile !== null && selectedFile.name !== user.profile_picture)
		{
			userProfileData.append('profile_picture', selectedFile);
			setUser({...user, profile_picture: selectedFile});
		}
		else
 		{
			userProfileData.append('profile_picture', "null");
		}


		axios.put("http://127.0.0.1:8000/api/users/1/", userProfileData, 
		{
			headers: 
			{
				'Content-Type': 'multipart/form-data',
			},
		})
		.then((response) => {
			// console.log(response.data);
		})
		.catch((error) => {
			if (error.response && error.response.data) 
			{
					const errorData = error.response.data;
					let errorMessage = ""; 
					for (const [field, messages] of Object.entries(errorData)) {
					errorMessage += `${field}: ${messages.join(", ")}\n`;
			}
				// alert(errorMessage);
				console.log(errorMessage);
			} 
			else 
			{
				alert("An unexpected error occurred.");
			}
		}
		);
	}


	function saveChanges() {
		update_user_info()
	}

	function handleImageChange(e) {
		const file = e.target.files[0];
		if (file){
			setPreview(URL.createObjectURL(file));
			setSelectedFile(file);
		}
	}

	function handleUploadClick() {
		document.getElementById('fileInput').click();
	}


	function handleRemoveImage() {
		setPreview(null);
		setSelectedFile(null);
		setImage(defaultImagePath);
	}

	// console.log(test);

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



						<div className='flex items-center max-ms:flex-col lp:gap-14 tb:gap-8 gap-5' >

							<div>
								<img
									
									src={ preview || `http://localhost:8000${image}`}
									className='rounded-full border border-primary profile-pic'
									alt='Profile Picture'
								/>
							</div>

							<div className='flex max-ms:flex-col lp:gap-2 gap-1'>
								<input
          							type="file"
          							id="fileInput"
          							accept="image/*"
          							onChange={handleImageChange}
          							style={{ display: "none" }} // Hide the file input
									/>	
								<Button
									className={'rounded-md border-border font-regular buttons-text update-button'}
									onClick={handleUploadClick}
									>
									Update Profile Picture
								</Button>
								<Button
									className={
										'rounded-md border-border font-regular buttons-text remove-button'
									}
									onClick={handleRemoveImage}
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
											value={display_name}
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
