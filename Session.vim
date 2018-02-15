let SessionLoad = 1
if &cp | set nocp | endif
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd /storage/4951-1BEB/000-WORK/000-GIT/dont-dilly-dally
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +0 src/DDDConsts.js
badd +1 src/DDD.scss
badd +1 src/FGUtils.js
badd +1 src/FGHTMLBuild.js
badd +1 src/DontDillyDally.js
argglobal
silent! argdel *
argadd src
edit src/DDD.scss
set splitbelow splitright
wincmd _ | wincmd |
split
wincmd _ | wincmd |
split
wincmd _ | wincmd |
split
3wincmd k
wincmd w
wincmd w
wincmd w
set nosplitbelow
set nosplitright
wincmd t
set winheight=1 winwidth=1
exe '1resize ' . ((&lines * 13 + 27) / 55)
exe '2resize ' . ((&lines * 12 + 27) / 55)
exe '3resize ' . ((&lines * 13 + 27) / 55)
exe '4resize ' . ((&lines * 12 + 27) / 55)
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 80 - ((10 * winheight(0) + 6) / 13)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
80
normal! 018|
lcd /storage/4951-1BEB/000-WORK/000-GIT/dont-dilly-dally
wincmd w
argglobal
edit /storage/4951-1BEB/000-WORK/000-GIT/dont-dilly-dally/src/FGHTMLBuild.js
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 1 - ((0 * winheight(0) + 6) / 12)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
1
normal! 0
lcd /storage/4951-1BEB/000-WORK/000-GIT/dont-dilly-dally
wincmd w
argglobal
edit /storage/4951-1BEB/000-WORK/000-GIT/dont-dilly-dally/src/FGUtils.js
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 1 - ((0 * winheight(0) + 6) / 13)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
1
normal! 0
lcd /storage/4951-1BEB/000-WORK/000-GIT/dont-dilly-dally
wincmd w
argglobal
edit /storage/4951-1BEB/000-WORK/000-GIT/dont-dilly-dally/src/DDDConsts.js
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 88 - ((3 * winheight(0) + 6) / 12)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
88
normal! 024|
lcd /storage/4951-1BEB/000-WORK/000-GIT/dont-dilly-dally
wincmd w
4wincmd w
exe '1resize ' . ((&lines * 13 + 27) / 55)
exe '2resize ' . ((&lines * 12 + 27) / 55)
exe '3resize ' . ((&lines * 13 + 27) / 55)
exe '4resize ' . ((&lines * 12 + 27) / 55)
tabnext 1
if exists('s:wipebuf')
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 shortmess=filnxtToO
let s:sx = expand("<sfile>:p:r")."x.vim"
if file_readable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &so = s:so_save | let &siso = s:siso_save
let g:this_session = v:this_session
let g:this_obsession = v:this_session
let g:this_obsession_status = 2
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
