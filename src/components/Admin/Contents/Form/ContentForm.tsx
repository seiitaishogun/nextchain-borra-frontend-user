import React, { ChangeEvent, useCallback, useState } from 'react';
import { Box, Button, FormGroup, Grid } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import styled from 'styled-components';
import debounce from 'lodash.debounce';
import copy from 'copy-to-clipboard';
import LabelGroup from '@/components/Admin/Common/Form/LabelGroup';
import TextField from '@/components/Admin/Common/Form/TextField';
import Radio from '@/components/Admin/Common/Form/Radio';
import File from '@/components/Admin/Common/Form/File';
import Textarea from '@/components/Admin/Common/Form/Textarea';
import { ContentsFormT } from '@/components/Admin/Contents/Form/types';
import SelectController from '@/components/Admin/Common/Form/Select/SelectController';
import CheckboxController from '@/components/Admin/Common/Form/Checkbox/CheckboxController';
import MultiPicker from '@/components/Admin/Common/Datepicker/MultiPicker';
import Snackbar from '@/components/Common/Snackbar';
import SurveySearch from '@/components/Admin/Contents/Form/Survey/Search';
import {
  DISPLAY_OPTIONS,
  SITE_OPTIONS,
  WAIT_FREE_TIME_OPTIONS,
} from '@/constants/admin/contents/search';
import { Categories, Types } from '@/types/admin/contents/contentsData';
import useTags from '@/hooks/admin/useTags';
import { TYPE_OPTIONS } from '@/types/admin/advertises';

interface Props {
  formControl: UseFormReturn<ContentsFormT>;
  categories: Categories;
  types: Types;
  isAdvertise?: boolean;
  isUpdate?: boolean;
  advertise?: {
    code: string;
    url: string;
    utm_url: string;
  };
}

/* TODO: 태마 기능 사용 시 주석 제거
const Tag = styled.div`
  display: flex;
  align-items: center;

  .close-btn {
    margin: 0 12px 0 4px;
  }
`;
 */

const Typo = styled.span`
  min-width: 40px;
  margin-left: 6px;
`;

function ContentForm({
  formControl,
  categories,
  types,
  isAdvertise,
  isUpdate,
  advertise,
}: Props) {
  const { control, watch, setValue, getValues } = formControl;
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);
  const [rate, setRate] = useState<number | null>(); // 할인율
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const tags = useTags();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValue(name as keyof ContentsFormT, value);
  };

  const updateDiscountPrice = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    handleChange(e);
    debounce(() => {
      const price = Number(getValues('price'));
      const discount_price = Number(getValues('discount_price'));
      if (price && discount_price) {
        const newRate = Math.floor(((price - discount_price) / price) * 100);
        setRate(newRate);
      } else {
        setRate(null);
      }
    }, 1000)();
  };

  const updateRate = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newRate = Number(e.target.value);
    setRate(newRate);
    debounce(() => {
      const price = Number(getValues('price'));

      if (price && newRate) {
        const discountPrice = Math.floor((price * newRate) / 100);
        setValue('discount_price', price - discountPrice);
      } else {
        setValue('discount_price', null);
      }
    }, 1000)();
  };

  const handleCopy = useCallback(() => {
    if (!advertise?.url) return;
    copy(advertise.url);
    setOpenSnackbar(true);
  }, [advertise?.url]);


  return (
    <Grid container spacing={0}>
      <LabelGroup label="콘텐츠명" id="name">
        <TextField
          fullWidth
          name="name"
          defaultValue={getValues('name')}
          onChange={handleChange}
        />
      </LabelGroup>
      <LabelGroup label="콘텐츠코드" id="code">
        <TextField
          fullWidth
          name="code"
          defaultValue={getValues('code')}
          onChange={handleChange}
        />
      </LabelGroup>

      <LabelGroup label="노출 상태" id="open_status">
        <Radio
          labels={DISPLAY_OPTIONS}
          name="open_status"
          defaultValue={getValues('open_status')}
          onChange={handleChange}
        />
      </LabelGroup>

      <LabelGroup label="노출 기간" id="visible_date">
        <MultiPicker
          showTimeInput
          dateFormat="yyyy-MM-dd HH:mm"
          isButtonPicker={false}
          startDate={watch('visible_started_at')}
          startDateName="visible_started_at"
          setStartDate={({ name, value }) =>
            setValue(name as keyof ContentsFormT, value)
          }
          endDate={watch('visible_ended_at')}
          endDateName="visible_ended_at"
          setEndDate={({ name, value }) =>
            setValue(name as keyof ContentsFormT, value)
          }
        />
      </LabelGroup>
      <LabelGroup label="기다리면 무료 설정" id="wait_free_time">
        <Radio
          labels={WAIT_FREE_TIME_OPTIONS}
          name="is_wait_free_time"
          defaultValue={getValues('is_wait_free_time')}
          onChange={e => {
            const { name, value } = e.target;
            const isWaitFreeTime = Number(value);
            if (!isWaitFreeTime) setValue('wait_free_time', 0);
            setValue(name as keyof ContentsFormT, isWaitFreeTime);
          }}
        />
        <TextField
          name="wait_free_time"
          value={
            watch('wait_free_time') === 0 || watch('wait_free_time')
              ? watch('wait_free_time')
              : ''
          }
          defaultValue={watch('wait_free_time')}
          onChange={handleChange}
          disabled={!watch('is_wait_free_time')}
        />
        <Typo>시간</Typo>
      </LabelGroup>
      <LabelGroup label="최초 무료" id="is_first_free">
        <CheckboxController
          name="is_first_free"
          control={control}
          options={[{ label: '최초 무료', value: 0 }]}
        />
      </LabelGroup>
      <LabelGroup label="다시 보기/공유하기 기간" id="available_time">
        <TextField
          name="available_time"
          defaultValue={getValues('available_time')}
          onChange={handleChange}
        />
        <Typo>시간</Typo>
      </LabelGroup>
      <LabelGroup label="New/Hot">
        <FormGroup row>
          <CheckboxController
            name="is_new"
            control={control}
            options={[{ label: 'New', value: 0 }]}
          />
          <CheckboxController
            name="is_hot"
            control={control}
            options={[{ label: 'HOT', value: 0 }]}
          />
        </FormGroup>
      </LabelGroup>
      <LabelGroup label="정상가격/할인가격/할인율">
        <Grid style={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            type="number"
            placeholder="정상가"
            name="price"
            defaultValue={getValues('price')}
            onChange={handleChange}
          />
          <Typo>원 /</Typo>
          <TextField
            type="number"
            placeholder="할인가격"
            name="discount_price"
            value={watch('discount_price') || ''}
            onChange={updateDiscountPrice}
          />
          <Typo>원 /</Typo>
          <TextField
            type="number"
            placeholder="할인율"
            value={rate || ''}
            onChange={updateRate}
          />
          <Typo>%</Typo>
        </Grid>
      </LabelGroup>
      <LabelGroup label="할인 기간" id="discount_date">
        <MultiPicker
          showTimeInput
          dateFormat="yyyy-MM-dd HH:mm"
          isButtonPicker={false}
          startDate={watch('discount_started_at')}
          startDateName="discount_started_at"
          setStartDate={({ name, value }) =>
            setValue(name as keyof ContentsFormT, value)
          }
          endDate={watch('discount_ended_at')}
          endDateName="discount_ended_at"
          setEndDate={({ name, value }) =>
            setValue(name as keyof ContentsFormT, value)
          }
        />
      </LabelGroup>

      {isAdvertise && (
        <LabelGroup label="광고 제휴처" id="site">
          <Radio
            labels={TYPE_OPTIONS}
            name="site"
            defaultValue={getValues('site')}
            onChange={handleChange}
          />
        </LabelGroup>
      )}
      {!isAdvertise && (
        <LabelGroup label="노출 채널" id="site">
          <Radio
            labels={SITE_OPTIONS}
            name="site"
            defaultValue={getValues('site')}
            onChange={handleChange}
          />
        </LabelGroup>
      )}
      <LabelGroup label="카테고리">
        <SelectController
          name="category_id"
          control={control}
          isDefault
          defaultConfig={{ text: '카테고리 선택', value: '' }}
          options={categories.map(({ id, name }) => ({
            value: id,
            label: name,
          }))}
        />
        <SelectController
          name="type_id"
          control={control}
          isDefault
          defaultConfig={{ text: '분류 선택', value: '' }}
          options={types.map(({ id, description }) => ({
            value: id,
            label: description,
          }))}
        />
      </LabelGroup>

      {isAdvertise && isUpdate && (
        <>
          <LabelGroup label="제휴사 코드" xs={6}>
            <TextField
              fullWidth
              placeholder="제휴사 코드를 입력해주세요."
              name="advertise_code"
              defaultValue={getValues('advertise_code')}
              onChange={e => {
                const { value } = e.target;
                setValue('advertise_code', value);
              }}
            />
          </LabelGroup>

          <LabelGroup label="URL" id="url" xs={6}>
            <Button
              type="button"
              onClick={handleCopy}
              sx={{
                textTransform: 'none',
              }}
            >
              {advertise?.url || ''}
            </Button>
            <Snackbar
              isOpen={openSnackbar}
              setIsOpen={setOpenSnackbar}
              message="클립보드에 링크가 복사되었어요."
            />
          </LabelGroup>
        </>
      )}

      <LabelGroup xs={12} label="설문">
        <Button type="button" onClick={() => setIsSurveyOpen(true)}>
          설문 검색
        </Button>

        <Box>{getValues('survey')?.name || ''}</Box>

        <SurveySearch
          open={isSurveyOpen}
          setOpen={setIsSurveyOpen}
          selected={getValues('survey')}
          handleSelected={selected => setValue('survey', selected)}
        />
      </LabelGroup>

      {/* TODO: 테마 기능 사용 시 주석 제거
      <LabelGroup xs={12} label="테마">
        <Button type="button" onClick={() => setIsThemeOpen(true)}>
          테마 검색
        </Button>

        {getValues('themes').map(theme => (
          <Tag key={theme.name}>
            <span>{theme.name}</span>
            <ClearIcon
              className="close-btn"
              onClick={() => {
                setValue(
                  'themes',
                  watch('themes').filter(t => t.id !== theme.id)
                );
              }}
            />
          </Tag>
        ))}

        <ThemeSearch
          open={isThemeOpen}
          setOpen={setIsThemeOpen}
          selected={getValues('themes')}
          handleSelected={selected => setValue('themes', selected)}
        />
      </LabelGroup>
       */}
      <LabelGroup xs={12} id="tags" label="해시태그">
        <CheckboxController name="tags" control={control} options={tags} />
      </LabelGroup>
      <LabelGroup xs={12} id="summary" label="콘텐츠 한줄소개">
        <TextField
          fullWidth
          name="summary"
          defaultValue={getValues('summary')}
          onChange={handleChange}
        />
      </LabelGroup>
      <LabelGroup xs={12} id="contents" label="상세소개(입력페이지)">
        <Textarea
          name="contents"
          defaultValue={getValues('contents')}
          onChange={handleChange}
        />
      </LabelGroup>

      <LabelGroup xs={12} id="banner_id" label="상단배너">
        <File
          name="banner_id"
          isPreview={true}
          file={getValues('banner')}
          handleChange={file => {
            setValue('banner_id', file?.id);
          }}
        />
      </LabelGroup>
      <LabelGroup xs={12} id="banner_text_id" label="제목 텍스트 이미지">
        <File
          name="banner_text_id"
          isPreview
          file={getValues('banner_text')}
          handleChange={file => setValue('banner_text_id', file?.id)}
        />
      </LabelGroup>
      <LabelGroup xs={12} id="thumbnail_id" label="썸네일(정사각형)">
        <File
          name="thumbnail_id"
          isPreview
          file={getValues('thumbnail')}
          handleChange={file => setValue('thumbnail_id', file?.id)}
        />
      </LabelGroup>
      <LabelGroup xs={12} id="thumbnail_large_id" label="썸네일(대형)">
        <File
          name="thumbnail_large_id"
          isPreview
          file={getValues('thumbnail_large')}
          handleChange={file => setValue('thumbnail_large_id', file?.id)}
        />
      </LabelGroup>
    </Grid>
  );
}

export default ContentForm;
