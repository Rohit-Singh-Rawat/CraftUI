'use client';

import * as React from 'react';
import { PasswordValidation, defaultPasswordRules } from '@/craft/components/password-validation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';

const PasswordValidationDemo = () => {
	const [password, setPassword] = React.useState('');
	const [showPassword, setShowPassword] = React.useState(false);

	return (
		<div className='flex items-center justify-center w-full h-full p-6'>
			<div className='w-full max-w-md space-y-2'>
				<Label
					htmlFor='password'
					className='font-light text-muted-foreground my-2'
				>
					Password
				</Label>
				<div className='relative '>
					<Input
						id='password'
						type={showPassword ? 'text' : 'password'}
						placeholder='Enter your password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className='pr-10 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-xl '
					/>
					<button
						type='button'
						onClick={() => setShowPassword(!showPassword)}
						className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
					>
						{showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
					</button>
				</div>
				<PasswordValidation
					password={password}
					rules={defaultPasswordRules}
				/>
			</div>
		</div>
	);
};

export default PasswordValidationDemo;
